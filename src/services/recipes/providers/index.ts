/* eslint-disable import/no-cycle */
import fetch from 'cross-fetch';
import { nanoid } from 'nanoid';

import { isValidRecipe, Recipe } from 'services/recipes';
import { DefaultProvider } from 'services/recipes/providers/default';
import { AniaGotujeProvider } from 'services/recipes/providers/websites/aniagotuje';
import { AniaStarmachProvider } from 'services/recipes/providers/websites/aniastarmach';
import { BeszamelProvider } from 'services/recipes/providers/websites/beszamel';
import { DoradcaSmakuProvider } from 'services/recipes/providers/websites/doradcasmaku';
import { KwestiaSmakuProvider } from 'services/recipes/providers/websites/kwestiasmaku';

import appLogger from 'utils/logger';
import { baseUrl } from 'utils/url';

// ############################################################################
export const PROVIDERS = [
  KwestiaSmakuProvider,
  BeszamelProvider,
  AniaStarmachProvider,
  DoradcaSmakuProvider,
  AniaGotujeProvider,
];
// ############################################################################

export type RecipeScrapper = (doc: Document) => Promise<Partial<Recipe>>;

export interface Provider {
  name?: string;
  url?: string;
  icon?: string;
  scrapper: RecipeScrapper;
}

export const chooseProvider = (url: string): Provider => {
  const choosenProvider = PROVIDERS.find((provider) => provider.url === baseUrl(url));
  return choosenProvider ?? DefaultProvider;
};

export class InvalidRecipeError extends Error {}

const log = appLogger.extend('scrapper');

export const scrapeRecipe = async (url: string): Promise<Recipe> => {
  try {
    const recipeUrl = new URL(url);
    log('scrapping recipe at url: %s', recipeUrl);

    const targetUrl = (import.meta.env.VITE_CORS_PROXY as string ?? '') + encodeURIComponent(recipeUrl.toString());
    const data = await fetch(targetUrl).then((res) => res.text());

    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');

    const provider = chooseProvider(url);
    const partialRecipe = await provider.scrapper(doc);

    const recipe = {
      ...partialRecipe,
      id: nanoid(),
      url,
    };

    if (isValidRecipe(recipe)) {
      log('parsed recipe: %O', recipe);
      return recipe;
    }
    throw Error('Invalid recipe');
  } catch (error) {
    const anyError = error as Error;

    log(anyError);
    throw new InvalidRecipeError(anyError.message);
  }
};
