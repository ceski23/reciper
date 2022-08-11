/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
import dayjs from 'dayjs';
import { HowToStep, Recipe as SchemaRecipe } from 'schema-dts';

import { Recipe } from 'services/recipes';
import { RecipeScrapper } from 'services/recipes/providers';
import { colorExtractor } from 'services/recipes/providers/utils';

import { nonNullable } from 'utils/guards';
import { removeEmpty } from 'utils/objects';

function isHowToStepArray(instructions: SchemaRecipe['recipeInstructions']): instructions is HowToStep[] {
  return Array.isArray(instructions) && instructions[0]['@type'] === 'HowToStep';
}

const parseInstructions = (instructions: SchemaRecipe['recipeInstructions']): string[] | undefined => {
  // eslint-disable-next-line prefer-destructuring, no-param-reassign
  if (Array.isArray(instructions) && instructions.length === 1) instructions = instructions[0];
  // eslint-disable-next-line prefer-destructuring, no-param-reassign
  if (Array.isArray(instructions) && instructions.length === 1) instructions = instructions[0];

  // if (!instructions) throw Error('Couldn\'t parse instructions');
  if (!instructions) return [];

  if (typeof instructions === 'string') return [instructions];

  if ('@type' in instructions && instructions['@type'] === 'HowToSection') {
    const steps = instructions.steps ?? instructions.itemListElement;
    // if (!steps) throw Error('Couldn\'t parse instructions');
    if (!steps) return [];
    if (typeof steps === 'string') return [steps];

    if ('@type' in steps || '@id' in steps) return undefined;

    return steps.map((i) => {
      if (typeof i === 'string') return i;
      if ('@type' in i && i['@type'] === 'HowToStep') return i.description?.toString() || i.text?.toString();
      return undefined;
    }).filter(nonNullable);
  }

  if (isHowToStepArray(instructions)) {
    return instructions.map((i) => {
      if ('@type' in i && i['@type'] === 'HowToStep') return i.description?.toString() || i.text?.toString();
      return undefined;
    }).filter(nonNullable);
  }

  if (Array.isArray(instructions) && typeof instructions[0] === 'string') return instructions;

  // throw Error('Couldn\'t parse instructions');
  return [];
};

const parseJsons = (elems: NodeListOf<Element>) => {
  const jsons = [];

  for (const elem of elems) {
    if (elem.textContent) {
      const parsed = JSON.parse(elem.textContent);

      if ('@graph' in parsed && Array.isArray(parsed['@graph'])) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        jsons.push(...parsed['@graph'].filter((x) => x['@type'] === 'Recipe'));
      } else if (parsed['@type'] === 'Recipe') {
        jsons.push(parsed);
      }
    }
  }

  return jsons;
};

const getRating = (data: SchemaRecipe['aggregateRating']) => {
  if (!(data && '@type' in data && data['@type'] === 'AggregateRating')) return undefined;
  if (!data.ratingValue) return undefined;

  return Number.parseFloat(data.ratingValue?.toString());
};

// eslint-disable-next-line @typescript-eslint/require-await
const scrapper: RecipeScrapper = async (doc) => {
  const elems = doc.querySelectorAll('[type="application/ld+json"]');
  const data = parseJsons(elems)[0];

  if (!data) throw Error('No JSON-LD data available');

  const schemaRecipe = data as SchemaRecipe;

  const { name } = schemaRecipe;
  // if (!name) throw Error('Couldn\'t find recipe name');

  const { description } = schemaRecipe;
  let { image } = schemaRecipe;
  if (image !== undefined) {
    if (Array.isArray(image)) image = image[0];
    if (typeof image === 'string') image = image.toString();
    else if (!!image && '@type' in image) image = image.url;
  }

  const ingredientsData = schemaRecipe.recipeIngredient;
  // if (!ingredientsData) throw Error('Couldn\'t find ingredients');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ingredientsArray = Array.from(ingredientsData as any[] ?? []);
  const ingredients = ingredientsArray?.map((i) => ({ text: i }));

  // FIXME: Better instructions parsing
  const instructions = parseInstructions(schemaRecipe.recipeInstructions)
    ?.map((i) => ({ text: i.trim() }));
  // if (!instructions) throw Error('Couldn\'t find or parse instructions');

  let prepTimeISO = schemaRecipe.totalTime ?? schemaRecipe.prepTime;
  // FIXME: Better duration recognition
  if (prepTimeISO !== undefined && typeof prepTimeISO !== 'string') prepTimeISO = undefined;
  const prepTime = prepTimeISO ? dayjs.duration(prepTimeISO).asMinutes() : undefined;

  let servings = schemaRecipe.recipeYield
    ? Number.parseInt(schemaRecipe.recipeYield.toString(), 10)
    : undefined;
  if (Number.isNaN(servings)) servings = undefined;

  const caloriesText = (schemaRecipe.nutrition && '@type' in schemaRecipe.nutrition)
    ? schemaRecipe.nutrition.calories?.toString().replace('kcal', '').trim()
    : undefined;
  let calories = caloriesText ? Number.parseInt(caloriesText, 10) : undefined;
  if (Number.isNaN(calories)) calories = undefined;

  let color;
  try {
    if (image) {
      const palette = await colorExtractor(image.toString());
      color = palette.Vibrant?.hex;
    }
  } catch (error) {
    color = undefined;
  }

  const tags: string[] = [];

  const category = schemaRecipe.recipeCategory?.toString();
  if (category) tags.push(category.toLocaleLowerCase());

  const cuisine = schemaRecipe.recipeCuisine?.toString();
  if (cuisine) tags.push(cuisine.toLocaleLowerCase());

  const recipe: Partial<Recipe> = {
    name: name ? name.toString() : undefined,
    description: description?.toString(),
    image: image?.toString(),
    ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
    instructions,
    prepTime,
    tags,
    servings,
    calories,
    color,
    rating: getRating(schemaRecipe.aggregateRating),
  };

  return removeEmpty(recipe);
};

export default scrapper;
