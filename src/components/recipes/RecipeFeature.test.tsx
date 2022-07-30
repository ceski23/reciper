import { renderWithProviders } from 'test/utils';

import { ReactComponent as FlameIcon } from 'assets/recipes/fire.svg';

import { RecipeFeature } from 'components/recipes/RecipeFeature';

describe('RecipeFeature', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <RecipeFeature icon={FlameIcon} text="Test" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
