import chicken from 'assets/ingredients/chicken-fillet.png';
import flour from 'assets/ingredients/flour.png';
import chocolate from 'assets/ingredients/chocolate.png';
import butter from 'assets/ingredients/butter.png';
import salt from 'assets/ingredients/salt.png';
import sugar from 'assets/ingredients/sugar.png';
import eggs from 'assets/ingredients/eggs.png';

const KNOWN_INGREDIENTS = {
  chocolate: {
    pattern: /czekolad(?:a|y)/,
    image: chocolate,
  },
  flour: {
    pattern: /mąki/,
    image: flour,
  },
  chicken: {
    pattern: /kurczaka/,
    image: chicken,
  },
  butter: {
    pattern: /masła/,
    image: butter,
  },
  eggs: {
    pattern: /jaj(?:ko|ka|ek)?/,
    image: eggs,
  },
  sugar: {
    pattern: /cukru/,
    image: sugar,
  },
  salt: {
    pattern: /soli/,
    image: salt,
  },
};

export type KnownIngredient = keyof typeof KNOWN_INGREDIENTS;

export default KNOWN_INGREDIENTS;
