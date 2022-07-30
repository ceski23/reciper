import { renderHookWithProviders } from 'test/utils';

import { useRecipe } from 'hooks/recipes/useRecipe';

import { Recipe } from 'services/recipes';

describe('useRecipe', () => {
  const recipe: Recipe = {
    id: 'test',
    name: 'Test',
    ingredients: [{ text: 'test1' }],
    instructions: [{ text: 'test2' }],
    tags: ['test3', 'test4'],
    calories: 5,
    color: '#ff0000',
    description: 'Test test test',
    image: 'test.png',
    prepTime: 1,
    rating: 5,
    servings: 3,
    url: 'https://test.test',
  };

  it('should return recipe with given ID', () => {
    const { result } = renderHookWithProviders(() => useRecipe(recipe.id), {
      preloadedState: {
        recipes: {
          list: {
            [recipe.id]: recipe,
          },
          status: {},
          _persist: {
            rehydrated: true,
            version: 0,
          },
        },
      },
    });

    expect(result.current).toBeDefined();
  });

  it('should not return recipe', () => {
    const { result } = renderHookWithProviders(() => useRecipe(recipe.id));
    expect(result.current).not.toBeDefined();
  });
});
