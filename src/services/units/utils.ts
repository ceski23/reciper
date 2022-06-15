import KNOWN_INGREDIENTS, { IngredientName } from 'services/ingredients/database';
import { ParsedIngredient } from 'services/ingredients/models';
import { UnitName, units } from 'services/units';
import { UnitType } from 'services/units/models';

export const parseUnit = (text: string) => {
  const typedUnits = Object.entries(units) as Array<[UnitName, UnitType]>;
  return typedUnits.find(([,unit]) => unit.pattern.test(text))?.[0];
};

export const convertQuantity = (
  ingredient: IngredientName,
  amount: number,
  from: UnitName,
  to: UnitName,
) => {
  const multiplierFrom = KNOWN_INGREDIENTS[ingredient].conversions[from];
  const multiplierTo = KNOWN_INGREDIENTS[ingredient].conversions[to];

  if (!multiplierFrom || !multiplierTo) return undefined;

  const quantityInBaseUnit = amount * multiplierFrom;
  const quantityInTargetUnit = quantityInBaseUnit / multiplierTo;

  return quantityInTargetUnit;
};

export const convertIngredient = <T extends ParsedIngredient>(
  ingredient: T,
  newUnit?: UnitName,
) => {
  if (!newUnit || !('unit' in ingredient) || !('type' in ingredient) || !ingredient.type) return ingredient;

  const newQuantity = convertQuantity(
    ingredient.type,
    ingredient.quantity,
    ingredient.unit,
    newUnit,
  );

  if (!newQuantity) return ingredient;

  const newIngredient: T = {
    ...ingredient,
    quantity: newQuantity,
    unit: newUnit,
  };

  return newIngredient;
};
