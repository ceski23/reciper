import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { IngredientConverterModal } from 'components/recipes/IngredientConverterModal';

import { IngredientWithUnitAndType } from 'services/ingredients/models';
import { parseIngredient } from 'services/ingredients/parser';

describe('IngredientConverterModal', () => {
  const ingredient = parseIngredient('2 kilogramy mąki') as IngredientWithUnitAndType;

  const renderModal = () => renderWithProviders(
    <IngredientConverterModal ingredient={ingredient} isOpen onClose={vi.fn()} />,
  );

  it('should allow changing units', async () => {
    const user = userEvent.setup();
    renderModal();

    const [originUnit, targetUnit] = screen.getAllByRole('combobox');
    const [originQuantity, targetQuantity] = screen.getAllByRole('spinbutton');

    await user.selectOptions(
      originUnit,
      screen.getByRole('option', { name: /szklanki/i }),
    );

    expect(originQuantity).toHaveValue(2); // 2 szklanki
    expect(targetQuantity).toHaveValue(260); // 260 gram

    await user.selectOptions(
      targetUnit,
      screen.getByRole('option', { name: /kilogramów/i }),
    );

    expect(originQuantity).toHaveValue(2); // 2 szklanki
    expect(targetQuantity).toHaveValue(0.26); // 0.26 kilograma
  });

  it('should allow changing quantities', async () => {
    const user = userEvent.setup();
    renderModal();

    const [originQuantity, targetQuantity] = screen.getAllByRole('spinbutton');

    await user.clear(originQuantity);
    await user.type(originQuantity, '5');

    expect(originQuantity).toHaveValue(5); // 5 kilogramów
    expect(targetQuantity).toHaveValue(5000); // 5000 gramów

    await user.clear(targetQuantity);
    await user.type(targetQuantity, '1000');

    expect(originQuantity).toHaveValue(1); // 1 kilogram
    expect(targetQuantity).toHaveValue(1000); // 1000 gramów
  });

  it('should allow swapping values', async () => {
    const user = userEvent.setup();
    renderModal();

    const [originUnit, targetUnit] = screen.getAllByRole('combobox');
    const [originQuantity, targetQuantity] = screen.getAllByRole('spinbutton');

    expect(originUnit).toHaveDisplayValue(/kilogramy/i);
    expect(originQuantity).toHaveValue(2);

    expect(targetUnit).toHaveDisplayValue(/gramów/i);
    expect(targetQuantity).toHaveValue(2000);

    const swapButton = screen.getByRole('button', { name: /zamień/i });
    await user.click(swapButton);

    expect(originUnit).toHaveDisplayValue(/gram/i);
    expect(originQuantity).toHaveValue(2000);

    expect(targetUnit).toHaveDisplayValue(/kilogramy/i);
    expect(targetQuantity).toHaveValue(2);
  });
});
