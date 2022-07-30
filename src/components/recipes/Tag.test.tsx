import { renderWithProviders } from 'test/utils';

import { Tag } from 'components/recipes/Tag';

describe('Tag', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithProviders(<Tag tag="test" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
