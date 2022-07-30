import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { RecipeForm, RecipeFormFields } from 'components/recipes/forms/RecipeForm';

describe('RecipeForm', () => {
  it('should be submitable', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<RecipeForm onSubmit={handleSubmit} aria-label="Test" />);

    await user.type(screen.getByLabelText(/nazwa przepisu/i), 'Testowy przepis');

    await user.click(screen.getByRole('button', { name: /dodaj składnik/i }));
    await user.type(screen.getByRole('textbox', { name: /składnik 1/i }), 'Testowy składnik');

    await user.click(screen.getByRole('button', { name: /dodaj krok/i }));
    await user.type(screen.getByRole('textbox', { name: /krok 1/i }), 'Testowy krok');

    const submitButton = screen.getByRole('button', { name: /zapisz/i });
    await user.click(submitButton);

    expect(handleSubmit).toBeCalledTimes(1);
  });

  it('should show errors when invalid data', async () => {
    const user = userEvent.setup();

    renderWithProviders(<RecipeForm onSubmit={vi.fn()} aria-label="Test" />);

    const submitButton = screen.getByRole('button', { name: /zapisz/i });
    await user.click(submitButton);

    const formErrors = screen.getAllByRole('alert');
    expect(formErrors.length).toBeGreaterThan(0);
  });

  it('should accept initial data', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    const initialData: RecipeFormFields = {
      name: 'test recipe',
      description: 'description',
      ingredients: [{ text: 'składnik 1' }],
      instructions: [{ text: 'krok 1' }],
      tags: [],
    };

    renderWithProviders(
      <RecipeForm
        onSubmit={handleSubmit}
        aria-label="Test"
        defaultValues={initialData}
      />,
    );

    const submitButton = screen.getByRole('button', { name: /zapisz/i });
    await user.click(submitButton);
    expect(handleSubmit).toBeCalledTimes(1);
  });
});
