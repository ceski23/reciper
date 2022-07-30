import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { Recipe } from 'components/recipes/Recipe';

import { Recipe as RecipeType } from 'services/recipes';

describe('Recipe', () => {
  const recipe: RecipeType = {
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
    url: 'https://test.test/',
  };

  it('should allow to add ingredients to shopping list', () => {
    renderWithProviders(<Recipe recipe={recipe} />, {
      preloadedState: {
        user: {
          _persist: {
            rehydrated: true,
            version: 0,
          },
          shoppingList: {
            id: 'test',
            name: 'Test',
          },
        },
      },
    });

    const addToShoppingListButton = screen.getByRole('button', { name: /dodaj do/i });
    expect(addToShoppingListButton).toBeInTheDocument();
  });

  it('should delete recipe', async () => {
    const user = userEvent.setup();

    const { store } = renderWithProviders(<Recipe recipe={recipe} />, {
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

    const deleteButton = screen.getByRole('button', { name: 'Usuń przepis' });
    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: 'Usuń' });
    await user.click(confirmButton);

    expect(store.getState().recipes.list[recipe.id]).not.toBeDefined();
  });

  it('should save recipe', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Recipe recipe={recipe} />);

    const saveButton = screen.getByRole('button', { name: /zapisz/i });
    await user.click(saveButton);

    expect(store.getState().recipes.list[recipe.id]).toBeDefined();
  });

  it('should allow to edit recipe', () => {
    renderWithProviders(<Recipe recipe={recipe} />, {
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

    const editButton = screen.getByRole('button', { name: /edytuj/i });
    expect(editButton).toBeInTheDocument();
  });
});
