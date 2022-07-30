import icon from 'assets/providers/doradca_smaku.png';

import { Recipe } from 'services/recipes';
import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import jsonldScrapper from 'services/recipes/providers/jsonld';

import { nonNullable } from 'utils/guards';

export const DoradcaSmakuProvider: Provider = (() => {
  const name = 'Doradca smaku';
  const url = 'https://www.doradcasmaku.pl/';

  const scrapper: RecipeScrapper = async (doc) => {
    const data = await jsonldScrapper(doc);

    const recipeImageElem = doc.querySelector('.recipe_item .recipe_gallery .img_wrapper img');
    const image = recipeImageElem?.getAttribute('data-src') ?? undefined;

    const instructionsElements = doc.querySelectorAll('.recipe-description__content > *');

    const instructions = Array
      .from(instructionsElements)
      .map((elem) => elem.textContent?.trim())
      .filter(nonNullable)
      .map((text) => ({ text }));

    const partial: Partial<Recipe> = {
      image,
      instructions,
    };

    return Object.assign(data, partial);
  };

  return {
    name, url, scrapper, icon,
  };
})();
