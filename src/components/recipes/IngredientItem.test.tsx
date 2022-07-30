import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { IngredientItem } from 'components/recipes/IngredientItem';

import { ParsedIngredient } from 'services/ingredients/models';
import { parseIngredient } from 'services/ingredients/parser';

describe('IngredientItem', () => {
  it('should be clickable', async () => {
    const ingredient: ParsedIngredient = parseIngredient('szczypta magii');
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <IngredientItem ingredient={ingredient} onClick={handleClick} />,
    );

    const element = screen.getByText(/szczypta magii/i);
    await user.click(element);
    expect(handleClick).toBeCalledTimes(1);
  });

  it('should render with UnknownIngredient', () => {
    const ingredient: ParsedIngredient = parseIngredient('szczypta magii');

    const { asFragment } = renderWithProviders(
      <IngredientItem ingredient={ingredient} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with IngredientWithQuantity', () => {
    const ingredient: ParsedIngredient = parseIngredient('duże 3 wiaderka betonu');

    const { asFragment } = renderWithProviders(
      <IngredientItem ingredient={ingredient} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with IngredientWithUnit', () => {
    const ingredient: ParsedIngredient = parseIngredient('3 kilogramy betonu');

    const { asFragment } = renderWithProviders(
      <IngredientItem ingredient={ingredient} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with IngredientWithQuantityAndType', () => {
    const ingredient: ParsedIngredient = parseIngredient('3 wiadra masła');

    const { asFragment } = renderWithProviders(
      <IngredientItem ingredient={ingredient} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with IngredientWithUnitAndType', () => {
    const ingredient: ParsedIngredient = parseIngredient('3 kilogramy masła');

    const { asFragment } = renderWithProviders(
      <IngredientItem ingredient={ingredient} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
