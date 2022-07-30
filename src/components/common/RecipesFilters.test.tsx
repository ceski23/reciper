import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { RecipesFilters } from 'components/common/RecipesFilters';

describe('RecipesFilters', () => {
  it('should render all filters', () => {
    renderWithProviders(
      <RecipesFilters onChangingDuration={vi.fn()} />,
    );

    const ingredientsWrapper = screen.getByRole('group', { name: /zawiera składniki/i });
    const ingredientsFilters = within(ingredientsWrapper).getAllByRole('checkbox');
    expect(ingredientsFilters.length).toBeGreaterThan(0);

    const durationFilter = screen.getByRole('slider', { name: /czas przygotowania/i });
    expect(durationFilter).toBeInTheDocument();
  });

  it('should check 2 ingredients', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <RecipesFilters onChangingDuration={vi.fn()} />,
    );

    const butter = screen.getByRole('checkbox', { name: /masło/i });
    await user.click(butter);

    const sugar = screen.getByRole('checkbox', { name: /cukier/i });
    await user.click(sugar);

    const selectedIngredients = screen.getAllByRole('checkbox', { checked: true });
    expect(selectedIngredients).toHaveLength(2);
  });
});
