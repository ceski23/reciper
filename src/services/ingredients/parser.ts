import ingredientsDatabase, { KnownIngredient } from 'services/ingredients/database';
import { UNITS } from 'services/units';
import { Unit } from 'services/units/Unit';

import unitsConverter from 'utils/unitsConverter';

export type Measure = 'length' | 'mass' | 'volume' | 'area';

interface IngredientWithQuantity {
  original: string;
  parsed: {
    begin: string;
    end: string;
  }
  quantity: number;
  type?: KnownIngredient;
}

interface IngredientWithUnit extends IngredientWithQuantity {
  unit: Unit;
}

interface UnknownIngredient {
  original: string;
  type?: KnownIngredient;
}

export type ParsedIngredient = IngredientWithQuantity | IngredientWithUnit | UnknownIngredient;

const units = UNITS
  .map((unit) => unit.pattern.source)
  .join('|');

// eslint-disable-next-line no-useless-escape
const quantityRegexp = /\d+(?:[\.,\/]\d+|\si\s\d+\/\d+)?/;

const quantityPattern = new RegExp(`(${quantityRegexp.source})\\s?(${units})?`);

const normalizeQuantity = (quantity: string): number => {
  // 1 i 1/3
  if (quantity.includes(' i ')) {
    const splitted = quantity.split(' i ');
    return normalizeQuantity(splitted[0]) + normalizeQuantity(splitted[1]);
  }

  // 3/4
  if (quantity.includes('/')) {
    const [dividend, divider] = quantity.split('/');
    return Number.parseInt(dividend, 10) / Number.parseInt(divider, 10);
  }

  return Number.parseFloat(quantity);
};

const extractQuantity = (ingredient: string) => {
  const match = quantityPattern.exec(ingredient);
  if (!match) return undefined;

  return {
    quantity: normalizeQuantity(match[1]),
    unit: Unit.fromPattern(match[2]),
    index: match.index,
    length: match[0].length,
  };
};

export const parseIngredient = (ingredient: string): ParsedIngredient => {
  const data = extractQuantity(ingredient);

  const ingredientType = Object.entries(ingredientsDatabase).find(
    ([, { pattern }]) => ingredient.match(pattern),
  )?.[0] as KnownIngredient | undefined;

  // Składnik bez liczb, np. sól, pieprz
  if (!data) {
    return {
      original: ingredient,
      type: ingredientType,
    };
  }

  // Sama liczba, np. sok z 1/4 limonki
  if (!data.unit) {
    return {
      original: ingredient,
      parsed: {
        begin: ingredient.substring(0, data.index).trim(),
        end: ingredient.substring(data.index + data.length).trim(),
      },
      quantity: data.quantity,
      type: ingredientType,
    };
  }

  return {
    original: ingredient,
    parsed: {
      begin: ingredient.substring(0, data.index).trim(),
      end: ingredient.substring(data.index + data.length).trim(),
    },
    quantity: data.quantity,
    unit: data.unit,
    type: ingredientType,
  };
};

export const convertIngredient = (ingredient: ParsedIngredient, newUnit?: string) => {
  if (!newUnit || !('unit' in ingredient)) return ingredient;

  const newQuantity = unitsConverter(ingredient.quantity)
    .from(ingredient.unit.normalizedName)
    .to(newUnit);

  const newIngredient: ParsedIngredient = {
    ...ingredient,
    quantity: newQuantity,
    unit: Unit.fromAbbrev(newUnit),
  };

  return newIngredient;
};
