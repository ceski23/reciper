import KNOWN_INGREDIENTS from 'services/ingredients/database';
import {
  kurczak, pancakes, pierniczki, ramen,
} from 'services/recipes/samples';
import RecipeSearch, { SearchParams } from 'services/search';

const findRecipes = (params: SearchParams) => {
  const searchEngine = new RecipeSearch([kurczak, pancakes, pierniczki, ramen]);
  const recipes = searchEngine.search(params);
  return recipes.map((recipe) => recipe.name);
};

describe('RecipeSearch', () => {
  it('should search by tag', () => {
    expect(findRecipes({ query: 'zupa' })).toStrictEqual([ramen.name]);
    expect(findRecipes({ query: 'indyka' })).toStrictEqual([kurczak.name]);
    expect(findRecipes({ query: 'słodko' })).toStrictEqual([pancakes.name, pierniczki.name]);
  });

  it('should search by name', () => {
    expect(findRecipes({ query: 'pierniczki' })).toStrictEqual([pierniczki.name]);
    expect(findRecipes({ query: 'ameryka' })).toStrictEqual([pancakes.name]);
  });

  it('should search by duration', () => {
    expect(findRecipes({ query: 'słodko', duration: 30 })).toStrictEqual([pancakes.name]);
    expect(findRecipes({ duration: 30 })).toStrictEqual([kurczak.name, pancakes.name, ramen.name]);
  });

  it('should search by ingredients', () => {
    expect(findRecipes({ ingredients: [KNOWN_INGREDIENTS.flour] }))
      .toStrictEqual([pancakes.name, pierniczki.name]);

    expect(findRecipes({ ingredients: [KNOWN_INGREDIENTS.milk] }))
      .toStrictEqual([pancakes.name]);

    expect(findRecipes({ ingredients: [KNOWN_INGREDIENTS.butter], duration: 20 }))
      .toStrictEqual([pancakes.name]);

    expect(findRecipes({ ingredients: [KNOWN_INGREDIENTS.chicken, KNOWN_INGREDIENTS.cream] }))
      .toStrictEqual([kurczak.name]);
  });
});
