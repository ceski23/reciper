import butter from 'assets/ingredients/butter.png';
import chicken from 'assets/ingredients/chicken-fillet.png';
import chocolate from 'assets/ingredients/chocolate.png';
import eggs from 'assets/ingredients/eggs.png';
import flour from 'assets/ingredients/flour.png';
import salt from 'assets/ingredients/salt.png';
import sugar from 'assets/ingredients/sugar.png';

const KNOWN_INGREDIENTS = {
  chocolate: {
    pattern: /\bczekolad(?:a|y)\b/,
    image: chocolate,
  },
  flour: {
    pattern: /\bmąki\b/,
    image: flour,
  },
  chicken: {
    pattern: /\bkurczaka\b/,
    image: chicken,
  },
  butter: {
    pattern: /\bmasła\b/,
    image: butter,
  },
  eggs: {
    pattern: /\bjaj(?:ko|ka|ek)?\b/,
    image: eggs,
  },
  sugar: {
    pattern: /\bcukru\b/,
    image: sugar,
  },
  salt: {
    pattern: /\bsoli\b/,
    image: salt,
  },
};

export type KnownIngredient = keyof typeof KNOWN_INGREDIENTS;

export default KNOWN_INGREDIENTS;
