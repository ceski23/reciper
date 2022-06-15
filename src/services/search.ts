import Fuse from 'fuse.js';

import { KnownIngredient } from 'services/ingredients/models';
import { Recipe } from 'services/recipes';

interface SearchParams {
  query?: string;
  ingredients?: KnownIngredient[];
  duration?: number;
}

export default class RecipeSearch {
  private recipes: Recipe[];

  constructor(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  private filterByIngredients(ingredients: KnownIngredient[]) {
    return this.recipes.filter((result) => {
      const hasAllRequiredIngredients = ingredients.every((requiredIngredient) => {
        const hasRequiredIngredient = result.ingredients.some((ingredient) => (
          requiredIngredient.pattern.test(ingredient.text)
        ));

        return hasRequiredIngredient;
      });

      return hasAllRequiredIngredients;
    });
  }

  private filterByQuery(query: string) {
    const fuzzySearch = new Fuse(this.recipes, {
      keys: [
        { name: 'name', weight: 3 },
        { name: 'tags', weight: 1 },
      ],
      // minMatchCharLength: 3,
    });

    return fuzzySearch
      .search(query)
      .map((r) => r.item);
  }

  private filterByDuration(duration: number) {
    return this.recipes.filter((recipe) => {
      if (recipe.prepTime) return recipe.prepTime <= duration;
      return true;
    });
  }

  public search({
    query = '',
    ingredients = [],
    duration = 0,
  }: SearchParams) {
    if (query !== '') this.recipes = this.filterByQuery(query);
    if (ingredients.length !== 0) this.recipes = this.filterByIngredients(ingredients);
    if (duration > 0) this.recipes = this.filterByDuration(duration);

    return this.recipes;
  }
}
