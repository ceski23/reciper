import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { InputSetting } from 'components/settings/InputSetting';

describe('InputSetting', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <InputSetting
        value="test"
        type="text"
        onChange={vi.fn()}
        hint="test1"
        title="Test"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should change value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithProviders(
      <InputSetting
        onChange={handleChange}
        type="text"
        value=""
        title="Test"
      />,
    );

    const input = screen.getByRole('textbox', { name: /test/i });
    await user.clear(input);
    await user.type(input, 'test');

    expect(handleChange).toBeCalledWith('t');
    expect(handleChange).toBeCalledWith('e');
    expect(handleChange).toBeCalledWith('s');
    expect(handleChange).toBeCalledWith('t');
  });
});
