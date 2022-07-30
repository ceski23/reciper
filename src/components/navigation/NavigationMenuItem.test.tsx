import { renderWithProviders } from 'test/utils';

import { NavigationMenuItem } from 'components/navigation/NavigationMenuItem';

describe('NavigationMenuItem', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <NavigationMenuItem title="Test" to="/test" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
