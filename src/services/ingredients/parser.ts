import { Entries } from 'types';

import ingredientsDatabase, { IngredientName } from 'services/ingredients/database';
import { KnownIngredient, ParsedIngredient } from 'services/ingredients/models';
import { units } from 'services/units';
import { parseUnit } from 'services/units/utils';

const unitPattern = Object
  .values(units)
  .map((unit) => unit.pattern.source)
  .join('|');

// eslint-disable-next-line no-useless-escape
const quantityPattern = /\d+(?:[\.,\/]\d+|\si\s\d+\/\d+)?/;
const quantityWithUnitPattern = new RegExp(`(${quantityPattern.source})\\s?(${unitPattern})?`);

const normalizeQuantity = (quantity: string): number => {
  // 1 i 1/3 -> 1.33
  if (quantity.includes(' i ')) {
    const splitted = quantity.split(' i ');
    return normalizeQuantity(splitted[0]) + normalizeQuantity(splitted[1]);
  }

  // 3/4 -> 0.75
  if (quantity.includes('/')) {
    const [dividend, divider] = quantity.split('/');
    return Number.parseInt(dividend, 10) / Number.parseInt(divider, 10);
  }

  return Number.parseFloat(quantity);
};

const extractQuantity = (ingredient: string) => {
  const match = quantityWithUnitPattern.exec(ingredient);
  if (!match) return undefined;

  return {
    quantity: normalizeQuantity(match[1]),
    unit: parseUnit(match[2]),
    index: match.index,
    length: match[0].length,
  };
};

const parseIngredientType = (text: string) => {
  // eslint-disable-next-line max-len
  const ingredients = Object.entries(ingredientsDatabase) as Entries<IngredientName, KnownIngredient>;
  return ingredients.find(([, ingredient]) => ingredient.pattern.test(text))?.[0];
};

export const parseIngredient = (ingredient: string): ParsedIngredient => {
  const data = extractQuantity(ingredient);
  const ingredientType = parseIngredientType(ingredient);

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
