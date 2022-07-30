import { renderWithProviders } from 'test/utils';

import { NavigationMenu } from 'components/navigation/NavigationMenu';

describe('NavigationMenu', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<NavigationMenu />);
    expect(asFragment()).toMatchSnapshot();
  });
});
