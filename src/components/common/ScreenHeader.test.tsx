import { renderWithProviders } from 'test/utils';

import { ScreenHeader } from 'components/common/ScreenHeader';

describe('ScreenHeader', () => {
  it('should render header with title and backlink', () => {
    const { asFragment } = renderWithProviders(
      <ScreenHeader title="Test" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
