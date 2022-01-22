/* eslint-disable import/no-cycle */
import type { Provider, RecipeScrapper } from '.';
import jsonld from './jsonld';
import microdata from './microdata';

export const DefaultProvider: Provider = (() => {
  const scrapper: RecipeScrapper = async (doc, url) => {
    const promises = [jsonld, microdata].map((fn) => fn(doc, url));
    promises.map((p) => p.catch((e) => { console.log(e); }));
    return Promise.any(promises);
  };

  return {
    scrapper,
  };
})();
