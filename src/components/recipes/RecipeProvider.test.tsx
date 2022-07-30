import { renderWithProviders } from 'test/utils';

import { RecipeProvider } from 'components/recipes/RecipeProvider';

import { Provider } from 'services/recipes/providers';

describe('RecipeProvider', () => {
  const provider: Provider = {
    scrapper: vi.fn(),
    icon: 'test.jpg',
    name: 'Test',
    url: 'https://test.test',
  };

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <RecipeProvider recipeUrl="https://test.test" provider={provider} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
