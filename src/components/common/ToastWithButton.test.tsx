import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { ToastWithButton } from 'components/common/ToastWithButton';

describe('ToastWithButton', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ToastWithButton buttonText="Test" onButtonClick={vi.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should be clickable', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<ToastWithButton buttonText="Test" onButtonClick={handleClick} />);

    const button = screen.getByRole('button', { name: /test/i });
    await user.click(button);
    expect(handleClick).toBeCalledTimes(1);
  });
});
