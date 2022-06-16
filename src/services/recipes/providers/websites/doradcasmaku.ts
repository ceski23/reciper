import icon from 'assets/providers/doradca_smaku.png';

import { Recipe } from 'services/recipes';
import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import jsonldScrapper from 'services/recipes/providers/jsonld';

export const DoradcaSmakuProvider: Provider = (() => {
  const name = 'Doradca smaku';
  const url = 'https://www.doradcasmaku.pl/';

  const scrapper: RecipeScrapper = async (doc) => {
    const data = await jsonldScrapper(doc);

    const recipeImageElem = doc.querySelector('.recipe_item .recipe_gallery .img_wrapper img');
    const image = recipeImageElem?.getAttribute('data-src') ?? undefined;

    const partial: Partial<Recipe> = {
      image,
    };

    return Object.assign(data, partial);
  };

  return {
    name, url, scrapper, icon,
  };
})();
