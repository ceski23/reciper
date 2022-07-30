import { renderHookWithProviders } from 'test/utils';

import { ConversionData, useIngredientConversion } from 'hooks/recipes/useIngredientConversion';

import { IngredientWithUnitAndType } from 'services/ingredients/models';
import { parseIngredient } from 'services/ingredients/parser';

describe('useIngredientConversion', () => {
  const ingredient = parseIngredient('2 kilogramy mąki') as IngredientWithUnitAndType;

  it('should convert units', () => {
    const { result } = renderHookWithProviders(() => useIngredientConversion(ingredient));

    expect(result.current.conversionData).toStrictEqual<ConversionData>({
      quantity: {
        from: 2,
        to: 2000,
      },
      unit: {
        from: 'kilogram',
        to: 'gram',
      },
      direction: null,
      lastDirection: 'from',
    });
  });

  it('should change unit', async () => {
    const {
      result, waitForNextUpdate,
    } = renderHookWithProviders(() => useIngredientConversion(ingredient));

    result.current.changeUnit({ from: 'gram' });

    await waitForNextUpdate();

    expect(result.current.conversionData).toStrictEqual<ConversionData>({
      quantity: {
        from: 2,
        to: 2,
      },
      unit: {
        from: 'gram',
        to: 'gram',
      },
      direction: null,
      lastDirection: 'from',
    });

    result.current.changeUnit({ to: 'kilogram' });

    await waitForNextUpdate();

    expect(result.current.conversionData).toStrictEqual<ConversionData>({
      quantity: {
        from: 2,
        to: 0.002,
      },
      unit: {
        from: 'gram',
        to: 'kilogram',
      },
      direction: null,
      lastDirection: 'from',
    });
  });

  it('should change quantity', async () => {
    const {
      result, waitForNextUpdate,
    } = renderHookWithProviders(() => useIngredientConversion(ingredient));

    result.current.changeQuantity({ from: 5 });

    await waitForNextUpdate();

    expect(result.current.conversionData).toStrictEqual<ConversionData>({
      quantity: {
        from: 5,
        to: 5000,
      },
      unit: {
        from: 'kilogram',
        to: 'gram',
      },
      direction: null,
      lastDirection: 'from',
    });

    result.current.changeQuantity({ to: 10000 });

    await waitForNextUpdate();

    expect(result.current.conversionData).toStrictEqual<ConversionData>({
      quantity: {
        from: 10,
        to: 10000,
      },
      unit: {
        from: 'kilogram',
        to: 'gram',
      },
      direction: null,
      lastDirection: 'to',
    });
  });

  it('should swap positions', () => {
    const { result } = renderHookWithProviders(() => useIngredientConversion(ingredient));

    expect(result.current.conversionData).toStrictEqual<ConversionData>({
      quantity: {
        from: 2,
        to: 2000,
      },
      unit: {
        from: 'kilogram',
        to: 'gram',
      },
      direction: null,
      lastDirection: 'from',
    });

    result.current.swapPositions();

    expect(result.current.conversionData).toStrictEqual<ConversionData>({
      quantity: {
        from: 2000,
        to: 2,
      },
      unit: {
        from: 'gram',
        to: 'kilogram',
      },
      direction: null,
      lastDirection: 'from',
    });
  });
});
