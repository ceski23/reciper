import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { RecipeStep } from 'components/recipes/RecipeStep';

describe('RecipeStep', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <RecipeStep instruction="test" stepNumber={2} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render marked as done', () => {
    const { asFragment } = renderWithProviders(
      <RecipeStep instruction="test" stepNumber={2} done />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be clickable', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(
      <RecipeStep instruction="test" stepNumber={2} onClick={handleClick} />,
    );

    const step = screen.getByRole('button');
    await user.click(step);
    expect(handleClick).toBeCalledTimes(1);
  });
});
