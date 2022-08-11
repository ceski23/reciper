/* eslint-disable no-restricted-syntax */
import icon from 'assets/providers/beszamel.svg';

import { Recipe, RecipeIngredient } from 'services/recipes';
import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import jsonldScrapper from 'services/recipes/providers/jsonld';
import { colorExtractor } from 'services/recipes/providers/utils';

import { getTextFromNode } from 'utils/dom';
import { nonNullable } from 'utils/guards';
import { removeEmpty } from 'utils/objects';

export const BeszamelProvider: Provider = (() => {
  const name = 'Beszamel';
  const url = 'https://beszamel.se.pl/';

  const parseIngredients = (doc: Document) => {
    const elements = doc.querySelectorAll('.ingredients__items li');
    let group: string | undefined;
    const ingredients: RecipeIngredient[] = [];

    for (const element of elements) {
      const text = getTextFromNode(element);

      if (text.endsWith(':')) {
        group = text;
      } else {
        ingredients.push(removeEmpty({ group, text }));
      }
    }

    return ingredients;
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const scrapper: RecipeScrapper = async (doc) => {
    const data = await jsonldScrapper(doc);

    let color;
    if (data?.image) {
      const palette = await colorExtractor(data.image);
      color = palette.Vibrant?.hex;
    }

    const tagsElements = doc.querySelectorAll('.breadcrumb .breadcrumb__item');
    const tags = Array
      .from(tagsElements)
      .map((elem) => elem.textContent?.toLowerCase().trim())
      .filter(nonNullable);

    const partial: Partial<Recipe> = {
      color,
      tags,
      ingredients: parseIngredients(doc),
    };

    return Object.assign(data, removeEmpty(partial));
  };

  return {
    name, url, scrapper, icon,
  };
})();
