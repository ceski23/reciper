import { parseIngredient } from 'services/ingredients/parser';
import { convertIngredient, convertQuantity, parseUnit } from 'services/units/utils';

describe('parseUnit', () => {
  it('should return undefined for unknown units', () => {
    expect(parseUnit('test')).toBe(undefined);
  });

  it('should properly parse units', () => {
    expect(parseUnit('1 gram masła')).toBe('gram');
    expect(parseUnit('1 g masła')).toBe('gram');
    expect(parseUnit('3kg mąki')).toBe('kilogram');
    expect(parseUnit('mąka: 30g')).toBe('gram');
    expect(parseUnit('ponad 3kg mąki')).toBe('kilogram');
    expect(parseUnit('2 duże szklanki mleka')).toBe('cup');
    expect(parseUnit('łyżka dziegciu')).toBe('tablespoon');
    expect(parseUnit('3 i 3/4 łyżeczki soli')).toBe('teaspoon');
  });
});

describe('convertQuantity', () => {
  it('should properly convert quantities', () => {
    expect(convertQuantity('chicken', 10, 'kilogram', 'gram')).toBe(10000);
    expect(convertQuantity('flour', 5, 'cup', 'kilogram')).toBe(0.65);
    expect(convertQuantity('milk', 1, 'liter', 'cup')).toBe(4);
  });

  it('should return undefined for unknown conversions', () => {
    expect(convertQuantity('chicken', 1, 'kilogram', 'cube')).toBe(undefined);
    expect(convertQuantity('chocolate', 1, 'teaspoon', 'liter')).toBe(undefined);
  });
});

describe('convertIngredient', () => {
  const milk = parseIngredient('2 litry mleka');
  const flour = parseIngredient('1kg mąki przennej');

  it('should properly convert ingredient', () => {
    expect(convertIngredient(milk, 'cup')).not.toStrictEqual(milk);
    expect(convertIngredient(flour, 'gram')).not.toStrictEqual(flour);
  });

  it('should return unmodified ingredient for unknown conversion', () => {
    expect(convertIngredient(milk, 'cube')).toStrictEqual(milk);
    expect(convertIngredient(flour, 'liter')).toStrictEqual(flour);
  });
});
