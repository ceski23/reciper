import { renderWithProviders } from 'test/utils';

import { FluidContainer, FullBleed } from 'components/common/Container';

describe('FluidContainer', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<FluidContainer />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('FullBleed', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<FullBleed />);
    expect(asFragment()).toMatchSnapshot();
  });
});
