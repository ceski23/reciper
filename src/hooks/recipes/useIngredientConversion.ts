import { useState, useCallback, useEffect } from 'react';

import { useAppSelector } from 'hooks/store';

import KNOWN_INGREDIENTS from 'services/ingredients/database';
import { IngredientWithUnitAndType } from 'services/ingredients/models';
import { UnitName } from 'services/units';
import { convertIngredient, convertQuantity } from 'services/units/utils';

import { selectUnitsConversions } from 'store/settings';

export interface ConversionData {
  quantity: {
    from: number
    to: number
  },
  unit: {
    from: UnitName
    to: UnitName
  },
  direction: 'from' | 'to' | null,
  lastDirection: ConversionData['direction']
}

export const useIngredientConversion = (ingredient: IngredientWithUnitAndType) => {
  const conversions = useAppSelector(selectUnitsConversions);
  const defaultUnit = conversions[ingredient.type] ?? KNOWN_INGREDIENTS[ingredient.type].baseUnit;

  const initialData = useCallback((): ConversionData => ({
    quantity: {
      from: ingredient.quantity,
      to: convertIngredient(ingredient, defaultUnit).quantity,
    },
    unit: {
      from: ingredient.unit,
      to: defaultUnit,
    },
    direction: null,
    lastDirection: 'from',
  }), [defaultUnit, ingredient]);

  const [conversionData, setConversionData] = useState(() => initialData());

  const updateConversion = useCallback(() => {
    if (!conversionData.direction) return;

    const convertedQuantity = convertQuantity(
      ingredient.type,
      conversionData.direction === 'from' ? conversionData.quantity.from : conversionData.quantity.to,
      conversionData.direction === 'from' ? conversionData.unit.from : conversionData.unit.to,
      conversionData.direction === 'from' ? conversionData.unit.to : conversionData.unit.from,
    );

    if (convertedQuantity === undefined) return;

    setConversionData((data) => ({
      ...data,
      quantity: {
        from: conversionData.direction === 'from' ? data.quantity.from : convertedQuantity,
        to: conversionData.direction === 'from' ? convertedQuantity : data.quantity.to,
      },
      direction: null,
      lastDirection: data.direction,
    }));
  }, [conversionData, ingredient.type]);

  const changeQuantity = (
    { from, to }: { from: number, to?: never } | { from?: never, to: number },
  ) => {
    setConversionData((data) => ({
      ...data,
      quantity: {
        from: from ?? data.quantity.from,
        to: to ?? data.quantity.to,
      },
      direction: from !== undefined ? 'from' : 'to',
    }));
  };

  const changeUnit = (
    { from, to }: { from: UnitName, to?: never } | { from?: never, to: UnitName },
  ) => {
    setConversionData((data) => ({
      ...data,
      unit: {
        from: from ?? data.unit.from,
        to: to ?? data.unit.to,
      },
      direction: conversionData.lastDirection,
    }));
  };

  const swapPositions = () => {
    setConversionData((data) => ({
      ...data,
      unit: {
        from: data.unit.to,
        to: data.unit.from,
      },
      quantity: {
        from: data.quantity.to,
        to: data.quantity.from,
      },
    }));
  };

  useEffect(() => { updateConversion(); }, [updateConversion]);

  useEffect(() => { setConversionData(initialData()); }, [initialData]);

  return {
    changeQuantity, changeUnit, conversionData, swapPositions,
  };
};
