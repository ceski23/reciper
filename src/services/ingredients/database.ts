import butter from 'assets/ingredients/butter.png';
import chicken from 'assets/ingredients/chicken-fillet.png';
import chocolate from 'assets/ingredients/chocolate.png';
import eggs from 'assets/ingredients/eggs.png';
import flour from 'assets/ingredients/flour.png';
import salt from 'assets/ingredients/salt.png';
import sugar from 'assets/ingredients/sugar.png';

export interface IngredientType {
  name: string;
  pattern: RegExp;
  image: string;
}

const KNOWN_INGREDIENTS: Record<string, IngredientType> = {
  chocolate: {
    name: 'czekolada',
    pattern: /\bczekolad(?:a|y)\b/,
    image: chocolate,
  },
  flour: {
    name: 'mąka',
    pattern: /\bmąki\b/,
    image: flour,
  },
  chicken: {
    name: 'kurczak',
    pattern: /\bkurczaka\b/,
    image: chicken,
  },
  butter: {
    name: 'masło',
    pattern: /\bmasła\b/,
    image: butter,
  },
  eggs: {
    name: 'jajka',
    pattern: /\bjaj(?:ko|ka|ek)?\b/,
    image: eggs,
  },
  sugar: {
    name: 'cukier',
    pattern: /\bcukru\b/,
    image: sugar,
  },
  salt: {
    name: 'sól',
    pattern: /\bsoli\b/,
    image: salt,
  },
};

export type KnownIngredient = keyof typeof KNOWN_INGREDIENTS;

export default KNOWN_INGREDIENTS;
