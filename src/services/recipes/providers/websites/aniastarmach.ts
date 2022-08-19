/* eslint-disable no-restricted-syntax */
import icon from 'assets/providers/ania_starmach.png';

import { Recipe, RecipeIngredient } from 'services/recipes';
import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import jsonldScrapper from 'services/recipes/providers/jsonld';
import { getColorFromImage } from 'services/recipes/providers/utils';

import { nonNullable } from 'utils/guards';
import { removeEmpty } from 'utils/objects';

export const AniaStarmachProvider: Provider = (() => {
  const name = 'Ania Starmach';
  const url = 'https://aniastarmach.pl/';

  const parseIngredients = (doc: Document) => {
    const ingredientElements = doc.querySelectorAll('.recipe-what-to-buy > ul > li');
    let group: string | undefined;
    const ingredients: RecipeIngredient[] = [];

    for (const element of ingredientElements) {
      if (element.classList.contains('recipe-ingredient-heading')) {
        group = element.textContent?.trim();
      } else {
        const text = element.textContent?.trim();
        if (text !== undefined && text.length > 0) {
          ingredients.push(removeEmpty({ text, group }));
        }
      }
    }

    return ingredients;
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const scrapper: RecipeScrapper = async (doc) => {
    const data = await jsonldScrapper(doc);

    const color = data.image ? await getColorFromImage(data.image) : undefined;

    const tagsElements = doc.querySelectorAll('.tags-wrapper a');
    const tags = Array
      .from(tagsElements)
      .map((elem) => elem.textContent?.toLowerCase())
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
