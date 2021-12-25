import { RecipeScrapper } from '.';

const scrapper: RecipeScrapper = async (doc, url) => {
  const root = doc.querySelector('[itemscope][itemtype="https://schema.org/Recipe"]');
  if (!root) throw Error('Couldn\'t find recipe');

  const name = root.querySelector('[itemprop="name"]')?.textContent || undefined;
  if (!name) throw Error('Couldn\'t find recipe name');

  const description = root.querySelector('[itemprop="description"]')?.textContent || undefined;
  const image = root.querySelector('[itemprop="image"]')?.getAttribute('src') || undefined;

  const instructionsElements = root.querySelectorAll('[itemprop="recipeInstructions"]');
  const instructions = Array
    .from(instructionsElements)
    .map((elem) => elem.textContent?.trim())
    .filter(Boolean) as string[];
  // if (instructions.length === 0) return undefined;

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
  // if (ingredients.length === 0) return undefined;

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
