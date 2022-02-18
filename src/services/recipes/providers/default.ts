/* eslint-disable import/no-cycle */

import { Provider, RecipeScrapper } from 'services/recipes/providers';
import jsonld from 'services/recipes/providers/jsonld';
import microdata from 'services/recipes/providers/microdata';

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
