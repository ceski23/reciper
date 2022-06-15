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

import { KnownIngredient } from 'services/ingredients/models';
import { gToKg, kgToG, lToMl } from 'services/ingredients/utils';

const createIngredients = <T extends string>(
  ingredients: Record<T, KnownIngredient>,
): Record<T, KnownIngredient> => ingredients;

const KNOWN_INGREDIENTS = createIngredients({
  chocolate: {
    name: 'czekolada',
    pattern: /\bczekolad(?:a|y)\b/u,
    image: chocolate,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
      bar: 100,
      cube: 6,
    },
  },
  flour: {
    name: 'mąka',
    pattern: /\bmąki\b/u,
    image: flour,
    baseUnit: 'gram',
    conversions: {
      kilogram: kgToG,
      gram: 1,
      cup: 130,
    },
  },
  chicken: {
    name: 'kurczak',
    pattern: /\bkurczaka\b/u,
    image: chicken,
    baseUnit: 'gram',
    conversions: {
      kilogram: kgToG,
      gram: 1,
    },
  },
  butter: {
    name: 'masło',
    pattern: /\bmasła\b/u,
    image: butter,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
      tablespoon: 10,
    },
  },
  eggs: {
    name: 'jajka',
    pattern: /\bjaj(?:ko|ka|ek)?\b/u,
    image: eggs,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: gToKg,
    },
  },
  sugar: {
    name: 'cukier',
    pattern: /\bcukru\b/u,
    image: sugar,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
      tablespoon: 12,
      teaspoon: 5,
      cup: 200,
    },
  },
  salt: {
    name: 'sól',
    pattern: /\bsoli\b/u,
    image: salt,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
      teaspoon: 6,
    },
  },
  pasta: {
    name: 'makaron',
    pattern: /\bmakaron(?:|u)\b/u,
    image: pasta,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
      cup: 70,
    },
  },
  milk: {
    name: 'mleko',
    pattern: /\bmleka\b/u,
    image: milk,
    baseUnit: 'milliliter',
    conversions: {
      milliliter: 1,
      cup: 250,
      liter: 1000,
    },
  },
  bakingpowder: {
    name: 'proszek do pieczenia',
    pattern: /\bproszku do pieczenia\b/u,
    image: bakingpowder,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
      teaspoon: 16,
    },
  },
  bacon: {
    name: 'boczek',
    pattern: /\bbocz(?:ek|ku)\b/u,
    image: bacon,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
    },
  },
  cream: {
    name: 'śmietana',
    pattern: /śmietan(?:a|ka|ki)/u,
    image: cream,
    baseUnit: 'milliliter',
    conversions: {
      milliliter: 1,
      liter: lToMl,
      cup: 250,
    },
  },
  gorgonzola: {
    name: 'gorgonzola',
    pattern: /\bgorgonzol(?:a|i)\b/u,
    image: gorgonzola,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
    },
  },
  bazil: {
    name: 'bazylia',
    pattern: /\bbazyl(?:ii|ia)\b/u,
    image: bazil,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
    },
  },
  tomato: {
    name: 'pomidor',
    pattern: /\bpomidor(?:|y|ów|ek|ki|ków)\b/u,
    image: tomato,
    baseUnit: 'gram',
    conversions: {
      gram: 1,
      kilogram: kgToG,
    },
  },
});

export type IngredientName = keyof typeof KNOWN_INGREDIENTS;

export default KNOWN_INGREDIENTS;
