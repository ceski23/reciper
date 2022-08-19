/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
import dayjs from 'dayjs';
import { HowToStep, ImageObject, Recipe as SchemaRecipe } from 'schema-dts';

import { Recipe } from 'services/recipes';
import { RecipeScrapper } from 'services/recipes/providers';
import { getColorFromImage } from 'services/recipes/providers/utils';

import { nonNullable } from 'utils/guards';
import appLogger from 'utils/logger';
import { removeEmpty } from 'utils/objects';

const log = appLogger.extend('scrapper:jsonld');

function isHowToStepArray(instructions: SchemaRecipe['recipeInstructions']): instructions is HowToStep[] {
  return Array.isArray(instructions) && instructions[0]['@type'] === 'HowToStep';
}

function isArrayOf<T>(
  value: unknown,
  predicate: (value: unknown) => value is T,
): value is Array<T> {
  return Array.isArray(value) && value.every(predicate);
}

const isString = (val: unknown): val is string => (
  typeof val === 'string'
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isImageObject = (val: any): val is ImageObject => (
  !!val && typeof val === 'object' && ('@type' in val) && val['@type'] === 'ImageObject'
);

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
      log(parsed);

      if ('@graph' in parsed && Array.isArray(parsed['@graph'])) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        jsons.push(...parsed['@graph'].filter((x) => x['@type'] === 'Recipe'));
      } else if (parsed['@type'] === 'Recipe') {
        jsons.push(parsed);
      } else if (Array.isArray(parsed)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        jsons.push(...parsed.filter((x) => x['@type'] === 'Recipe'));
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

const parseTags = (schemaRecipe: SchemaRecipe) => {
  const tags: string[] = [];

  const category = schemaRecipe.recipeCategory?.toString();
  if (category) tags.push(category.toLocaleLowerCase());

  const cuisine = schemaRecipe.recipeCuisine?.toString();
  if (cuisine) tags.push(cuisine.toLocaleLowerCase());

  const keywords = schemaRecipe.keywords?.toString();
  if (keywords) {
    tags.push(
      ...keywords.split(',').map((text) => text.toLocaleLowerCase().trim()),
    );
  }

  return tags;
};

const parseGallery = (schemaRecipe: SchemaRecipe): string[] | undefined => {
  const images = schemaRecipe.image;
  if (!images) return undefined;

  if (Array.isArray(images)) {
    // Array of strings
    if (isArrayOf(images, isString)) return images;

    // Array of ImageObject
    if (isArrayOf(images, isImageObject)) {
      return images
        .map((img) => img.url?.toString())
        .filter(nonNullable);
    }
  } else {
    // String
    if (isString(images)) return [images];

    // ImageObject
    if (isImageObject(images)) return images.url ? [images.url.toString()] : undefined;
  }

  return undefined;
};

// eslint-disable-next-line @typescript-eslint/require-await
const scrapper: RecipeScrapper = async (doc) => {
  log('scrapping recipe...');

  const elems = doc.querySelectorAll('[type="application/ld+json"]');
  const data = parseJsons(elems)[0];

  if (!data) {
    log('no ld+json schema found');
    throw Error('No JSON-LD data available');
  }

  log('found ld+json schema %O', data);

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

  const color = image ? await getColorFromImage(image.toString()) : undefined;

  const recipe: Partial<Recipe> = {
    name: name ? name.toString() : undefined,
    description: description?.toString(),
    image: image?.toString(),
    ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
    instructions,
    prepTime,
    tags: parseTags(schemaRecipe),
    servings,
    calories,
    color,
    rating: getRating(schemaRecipe.aggregateRating),
    gallery: parseGallery(schemaRecipe),
  };

  return removeEmpty(recipe);
};

export default scrapper;
