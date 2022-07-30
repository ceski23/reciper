import { renderWithProviders } from 'test/utils';

import { Page } from 'components/common/Page';

describe('Page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<Page />);

    expect(asFragment()).toMatchSnapshot();
  });
});
