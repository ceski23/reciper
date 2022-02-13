// https://www.mniammniam.com/kurczak-slodko-kwasny
// https://beszamel.se.pl/przepisy/dania-glowne-miesne/prosty-kurczak-w-sosie-slodko-kwasnym-gotowy-w-30-minut-re-iB8s-pmcM-Rz5i.html
// https://www.doradcasmaku.pl/przepis-soczysty-kurczak-w-sosie-slodko-kwasnym--349850

export interface Recipe {
  id: string;
  name: string;
  image?: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string; // ISO-8601 Duration
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

  // Has instructions
  if (!recipe.instructions || recipe.instructions.length <= 0) return false;

  // Has tags array
  if (!recipe.tags) return false;

  return true;
};
