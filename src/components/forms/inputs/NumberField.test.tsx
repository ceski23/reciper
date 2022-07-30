import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { NumberField } from 'components/forms/inputs/NumberField';

describe('NumberField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<NumberField onChange={vi.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should react to user input', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<NumberField onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, '123');
    expect(handleChange).toBeCalledTimes(3);
  });

  it('should have working + and - buttons', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<NumberField onChange={handleChange} value={5} step={2} />);

    const decreaseButton = screen.getByRole('button', { name: '-' });
    const increaseButton = screen.getByRole('button', { name: '+' });

    await user.click(decreaseButton);

    expect(handleChange).toBeCalledWith(3);

    await user.click(increaseButton);

    expect(handleChange).toBeCalledWith(7);
  });

  it('should accept only numbers', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<NumberField onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, 'test');
    expect(handleChange).toBeCalledWith(0);

    handleChange.mockClear();

    await user.clear(input);
    await user.type(input, '12');
    expect(handleChange).toBeCalledWith(0);
    expect(handleChange).toBeCalledWith(1);
    expect(handleChange).toBeCalledWith(2);
  });
});
