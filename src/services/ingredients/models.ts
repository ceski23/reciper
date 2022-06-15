import { IngredientName } from 'services/ingredients/database';
import { UnitName } from 'services/units';

export interface KnownIngredient {
  name: string;
  pattern: RegExp;
  image: string;
  baseUnit: UnitName;
  conversions: {
    [key in UnitName]?: number;
  };
}

interface UnknownIngredient {
  original: string;
}

interface IngredientWithQuantity {
  original: string;
  parsed: {
    begin: string;
    end: string;
  }
  quantity: number;
}

interface IngredientWithUnit extends IngredientWithQuantity {
  unit: UnitName;
}

export interface IngredientWithQuantityAndType extends IngredientWithQuantity {
  type: IngredientName;
}

export interface IngredientWithUnitAndType extends IngredientWithUnit {
  type: IngredientName;
}

export type ParsedIngredient =
  IngredientWithQuantity
  | IngredientWithUnit
  | UnknownIngredient
  | IngredientWithQuantityAndType
  | IngredientWithUnitAndType;
