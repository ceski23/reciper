import { renderWithProviders } from 'test/utils';

import { AuthToast } from 'components/common/AuthToast';

describe('AuthToast', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<AuthToast />);

    expect(asFragment()).toMatchSnapshot();
  });
});
