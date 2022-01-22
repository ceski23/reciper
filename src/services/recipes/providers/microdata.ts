/* eslint-disable import/no-cycle */
import { RecipeScrapper } from '.';

// eslint-disable-next-line @typescript-eslint/require-await
const scrapper: RecipeScrapper = async (doc, url) => {
  const root = doc.querySelector('[itemscope][itemtype="https://schema.org/Recipe"], [itemscope][itemtype="http://schema.org/Recipe"]');
  if (!root) throw Error('Couldn\'t find recipe');

  const nameElement = root.querySelector('[itemprop="name"]');
  const name = (nameElement?.tagName === 'META') ? nameElement.getAttribute('content') : nameElement?.textContent;
  if (!name) throw Error('Couldn\'t find recipe name');

  const descriptionElement = root.querySelector('[itemprop="description"]');
  const description = ((descriptionElement?.tagName === 'META') ? descriptionElement.getAttribute('content') : descriptionElement?.textContent) ?? undefined;

  const imageElement = root.querySelector('[itemprop="image"]');
  const image = ((imageElement?.tagName === 'META') ? imageElement.getAttribute('content') : imageElement?.getAttribute('src')) ?? undefined;

  const instructionsElements = root.querySelectorAll('[itemprop="recipeInstructions"]');
  const instructions = Array
    .from(instructionsElements)
    .map((elem) => elem.textContent?.trim())
    .filter(Boolean) as string[];

  // if (instructions.length === 0) throw Error('No instructions found');

  const prepTime = root.querySelector('[itemprop="prepTime"]')?.getAttribute('content') || undefined;

  // Rating
  const ratingElement = root.querySelector('[itemprop="ratingValue"]');
  const rating = (ratingElement?.textContent)
    ? Number.parseFloat(ratingElement.textContent)
    : undefined;

  // Nutrition
  const caloriesElement = root.querySelector('[itemprop="calories"]');
  const calories = (caloriesElement?.textContent)
    ? Number.parseInt(caloriesElement.textContent, 10)
    : undefined;

  // TODO: keywords, nutrition, recipeCategory, recipeCuisine

  const ingredientsElements = root.querySelectorAll('[itemprop="recipeIngredient"]');
  const ingredients = Array
    .from(ingredientsElements)
    .map((elem) => elem.textContent?.trim())
    .filter(Boolean) as string[];

  // if (ingredients.length === 0) throw Error('No ingredients found');

  return {
    name,
    ingredients,
    description,
    image,
    prepTime,
    instructions,
    url,
    rating,
    calories,
    tags: [],
  };
};

export default scrapper;
