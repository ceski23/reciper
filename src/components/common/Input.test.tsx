import { renderWithProviders } from 'test/utils';

import { Input } from 'components/common/Input';

describe('Input', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<Input name="test" placeholder="Test" value="" onChange={vi.fn()} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
