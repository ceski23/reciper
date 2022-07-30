import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { SettingsListItem } from 'components/settings/SettingsListItem';

describe('SettingsListItem', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <SettingsListItem icon="test.jpg" text="Test" onClick={vi.fn()} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be clickable', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(
      <SettingsListItem onClick={handleClick} text="Test" />,
    );

    const item = screen.getByRole('button', { name: /test/i });
    await user.click(item);
    expect(handleClick).toBeCalledTimes(1);
  });
});
