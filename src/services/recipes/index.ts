export interface RecipeIngredient {
  text: string;
  group?: string;
}

export interface RecipeInstruction {
  text: string;
  group?: string;
}

export interface Recipe {
  id: string;
  name: string;
  image?: string;
  description?: string;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  prepTime?: number;
  color?: string;
  url?: string;
  rating?: number;
  calories?: number;
  tags: string[];
  servings?: number;
}

// eslint-disable-next-line arrow-body-style
export const isValidRecipe = (recipe: Partial<Recipe>): recipe is Recipe => {
  // Has ID
  if (!recipe.id) return false;

  // Non-empty name
  if (!recipe.name) return false;

  // Has ingredients
  if (!recipe.ingredients || recipe.ingredients.length <= 0) return false;
  if (!recipe.ingredients[0].text) return false;

  // Has instructions
  if (!recipe.instructions || recipe.instructions.length <= 0) return false;
  if (!recipe.instructions[0].text) return false;

  // Has tags array
  if (!recipe.tags) return false;

  return true;
};
