/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
import { HowToStep, Recipe as SchemaRecipe } from 'schema-dts';

import { Recipe } from 'services/recipes';
import { RecipeScrapper } from 'services/recipes/providers';

function isHowToStepArray(instructions: SchemaRecipe['recipeInstructions']): instructions is HowToStep[] {
  return Array.isArray(instructions) && instructions[0]['@type'] === 'HowToStep';
}

const parseInstructions = (instructions: SchemaRecipe['recipeInstructions']): string[] | undefined => {
  // eslint-disable-next-line prefer-destructuring, no-param-reassign
  if (Array.isArray(instructions) && instructions.length === 1) instructions = instructions[0];
  // eslint-disable-next-line prefer-destructuring, no-param-reassign
  if (Array.isArray(instructions) && instructions.length === 1) instructions = instructions[0];

  if (!instructions) throw Error('Couldn\'t parse instructions');

  if (typeof instructions === 'string') return [instructions];

  if ('@type' in instructions && instructions['@type'] === 'HowToSection') {
    if (!instructions.steps) throw Error('Couldn\'t parse instructions');
    if (typeof instructions.steps === 'string') return [instructions.steps];

    if ('@type' in instructions.steps || '@id' in instructions.steps) return undefined;

    return instructions.steps.map((i) => {
      if (typeof i === 'string') return i;
      if ('@type' in i && i['@type'] === 'HowToStep') return i.description?.toString() || i.text?.toString();
      return undefined;
    }).filter((a): a is string => a !== undefined);
  }

  if (isHowToStepArray(instructions)) {
    return instructions.map((i) => {
      if ('@type' in i && i['@type'] === 'HowToStep') return i.description?.toString() || i.text?.toString();
      return undefined;
    }).filter((a): a is string => a !== undefined);
  }

  if (Array.isArray(instructions) && typeof instructions[0] === 'string') return instructions;

  throw Error('Couldn\'t parse instructions');
};

// eslint-disable-next-line @typescript-eslint/require-await
const scrapper: RecipeScrapper = async (doc) => {
  const data = doc.querySelectorAll('[type="application/ld+json"]');

  const recipeElement = Array.from(data).find((elem) => {
    if (!elem.textContent) return false;
    const parsed = JSON.parse(elem.textContent);
    return (parsed['@type'] === 'Recipe');
  });

  if (!recipeElement) throw Error('No JSON-LD data available');

  const schemaRecipe = JSON.parse(recipeElement.textContent ?? '') as SchemaRecipe;

  const { name } = schemaRecipe;
  if (!name) throw Error('Couldn\'t find recipe name');

  const { description } = schemaRecipe;
  let { image } = schemaRecipe;
  if (image !== undefined) {
    if (Array.isArray(image)) image = image[0];
    if (typeof image === 'string') image = image.toString();
    else if (!!image && '@type' in image) image = image.url;
  }

  const ingredients = schemaRecipe.recipeIngredient;
  if (!ingredients) throw Error('Couldn\'t find ingredients');

  // FIXME: Better instructions parsing
  const instructions = parseInstructions(schemaRecipe.recipeInstructions);
  if (!instructions) throw Error('Couldn\'t find or parse instructions');

  let prepTime = schemaRecipe.prepTime || schemaRecipe.totalTime;
  // FIXME: Better duration recognition
  if (prepTime !== undefined && typeof prepTime !== 'string') prepTime = undefined;

  const servings = schemaRecipe.recipeYield
    ? Number.parseInt(schemaRecipe.recipeYield.toString(), 10)
    : undefined;

  const recipe: Partial<Recipe> = {
    name: name.toString(),
    description: description?.toString(),
    image: image?.toString(),
    ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
    instructions,
    prepTime,
    tags: [],
    servings,
  };

  return recipe;
};

export default scrapper;
