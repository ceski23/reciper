import { renderWithProviders } from 'test/utils';

import { RecipeTile } from 'components/recipes/RecipeTile';

import { Recipe } from 'services/recipes';

describe('RecipeTile', () => {
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

  test('should render correctly', () => {
    const { asFragment } = renderWithProviders(<RecipeTile recipe={recipe} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
