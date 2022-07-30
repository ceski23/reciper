import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { ReactComponent as Icon } from 'assets/common/user.svg';

import { Button } from 'components/common/Button';

describe('Button', () => {
  it('should render', () => {
    renderWithProviders(<Button>test</Button>);

    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toBeInTheDocument();
  });

  it('should render with icon', () => {
    renderWithProviders(<Button icon={Icon}>test</Button>);

    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });

  it('should be clickable', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(<Button onClick={handleClick}>test</Button>);

    const button = screen.getByRole('button', { name: /test/i });
    await user.click(button);

    expect(handleClick).toBeCalledTimes(1);
  });
});
