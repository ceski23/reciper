import { renderWithProviders } from 'test/utils';

import { Loading } from 'components/common/Loading';

describe('Loading', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
