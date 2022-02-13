/* eslint-disable import/no-cycle */
import type { Provider, RecipeScrapper } from '.';
import jsonld from './jsonld';
import microdata from './microdata';

export const DefaultProvider: Provider = (() => {
  const scrapper: RecipeScrapper = async (doc) => {
    const promises = [jsonld, microdata].map((fn) => fn(doc));
    const partialRecipe = await Promise.any(promises);

    return partialRecipe;
  };

  return {
    scrapper,
  };
})();
