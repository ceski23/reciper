import bacon from 'assets/ingredients/bacon.webp';
import bakingpowder from 'assets/ingredients/bakingpowder.webp';
import bazil from 'assets/ingredients/bazil.webp';
import butter from 'assets/ingredients/butter.webp';
import chicken from 'assets/ingredients/chicken-fillet.webp';
import chocolate from 'assets/ingredients/chocolate.webp';
import cream from 'assets/ingredients/cream.webp';
import eggs from 'assets/ingredients/eggs.webp';
import flour from 'assets/ingredients/flour.webp';
import gorgonzola from 'assets/ingredients/gorgonzola.webp';
import milk from 'assets/ingredients/milk.webp';
import pasta from 'assets/ingredients/pasta.webp';
import salt from 'assets/ingredients/salt.webp';
import sugar from 'assets/ingredients/sugar.webp';
import tomato from 'assets/ingredients/tomato.webp';

export interface IngredientType {
  name: string;
  pattern: RegExp;
  image: string;
}

const KNOWN_INGREDIENTS: Record<string, IngredientType> = {
  chocolate: {
    name: 'czekolada',
    pattern: /\bczekolad(?:a|y)\b/u,
    image: chocolate,
  },
  flour: {
    name: 'mąka',
    pattern: /\bmąki\b/u,
    image: flour,
  },
  chicken: {
    name: 'kurczak',
    pattern: /\bkurczaka\b/u,
    image: chicken,
  },
  butter: {
    name: 'masło',
    pattern: /\bmasła\b/u,
    image: butter,
  },
  eggs: {
    name: 'jajka',
    pattern: /\bjaj(?:ko|ka|ek)?\b/u,
    image: eggs,
  },
  sugar: {
    name: 'cukier',
    pattern: /\bcukru\b/u,
    image: sugar,
  },
  salt: {
    name: 'sól',
    pattern: /\bsoli\b/u,
    image: salt,
  },
  pasta: {
    name: 'makaron',
    pattern: /\bmakaron(?:|u)\b/u,
    image: pasta,
  },
  milk: {
    name: 'mleko',
    pattern: /\bmleka\b/u,
    image: milk,
  },
  bakingpowder: {
    name: 'proszek do pieczenia',
    pattern: /\bproszku do pieczenia\b/u,
    image: bakingpowder,
  },
  bacon: {
    name: 'boczek',
    pattern: /\bbocz(?:ek|ku)\b/u,
    image: bacon,
  },
  cream: {
    name: 'śmietana',
    pattern: /śmietan(?:a|ka|ki)/u,
    image: cream,
  },
  gorgonzola: {
    name: 'gorgonzola',
    pattern: /\bgorgonzol(?:a|i)\b/u,
    image: gorgonzola,
  },
  bazil: {
    name: 'bazylia',
    pattern: /\bbazyl(?:ii|ia)\b/u,
    image: bazil,
  },
  tomato: {
    name: 'pomidor',
    pattern: /\bpomidor(?:|y|ów|ek|ki|ków)\b/u,
    image: tomato,
  },
};

export type KnownIngredient = keyof typeof KNOWN_INGREDIENTS;

export default KNOWN_INGREDIENTS;
