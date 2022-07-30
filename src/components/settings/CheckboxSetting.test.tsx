import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { CheckboxSetting } from 'components/settings/CheckboxSetting';

describe('CheckboxSetting', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <CheckboxSetting
        title="Test"
        name="test1"
        checked
        onChange={vi.fn()}
        hint="test2"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should change value', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <CheckboxSetting
        name="test"
        checked
        onChange={handleChange}
        title="Test"
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: /test/i });
    await user.click(checkbox);
    expect(handleChange).toBeCalledTimes(1);
  });
});
