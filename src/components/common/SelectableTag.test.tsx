import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { SelectableTag } from 'components/common/SelectableTag';

describe('SelectableTag', () => {
  it('should render with label and icon', () => {
    const { asFragment } = renderWithProviders(<SelectableTag label="Test" icon="test" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be clickable', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<SelectableTag label="Test" icon="test" onClick={handleClick} />);

    const tag = screen.getByRole('checkbox', { name: /test/i });
    expect(tag).toBeInTheDocument();

    await user.click(tag);
    expect(handleClick).toBeCalledTimes(1);
  });
});
