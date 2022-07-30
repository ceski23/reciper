import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { Servings } from 'components/recipes/Servings';

describe('Servings', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <Servings servings={0} onServingsChange={vi.fn()} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should increase or decrease servings', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <Servings servings={5} onServingsChange={handleChange} />,
    );

    const decreaseButton = screen.getByRole('button', { name: '-' });
    await user.click(decreaseButton);
    expect(handleChange).toBeCalledWith(4);

    handleChange.mockClear();

    const increaseButton = screen.getByRole('button', { name: '+' });
    await user.click(increaseButton);
    expect(handleChange).toBeCalledWith(6);
  });
});
