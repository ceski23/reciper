/* eslint-disable import/no-cycle */
import { nanoid } from 'nanoid';
import { baseUrl } from 'utils/url';
import { DefaultProvider } from './default';
import { isValidRecipe, Recipe } from '..';
import { AniaStarmachProvider } from './websites/aniastarmach';
import { BeszamelProvider } from './websites/beszamel';
import { KwestiaSmakuProvider } from './websites/kwestiasmaku';

// ############################################################################
export const PROVIDERS = [
  KwestiaSmakuProvider,
  BeszamelProvider,
  AniaStarmachProvider,
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

export const scrapeRecipe = async (url: string): Promise<Recipe> => {
  const targetUrl = (process.env.REACT_APP_CORS_PROXY ?? '') + encodeURIComponent(url);
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

  if (isValidRecipe(recipe)) return recipe;
  throw Error('Invalid recipe');
};
