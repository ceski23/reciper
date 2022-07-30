import { renderWithProviders } from 'test/utils';

import { RecipeCover } from 'components/recipes/RecipeCover';

describe('RecipeCover', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <RecipeCover src="test.jpg" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
