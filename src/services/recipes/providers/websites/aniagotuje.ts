import icon from 'assets/providers/ania_gotuje.png';

import { Recipe, RecipeIngredient, RecipeInstruction } from 'services/recipes';
import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import microdataScrapper from 'services/recipes/providers/microdata';
import { colorExtractor } from 'services/recipes/providers/utils';

import { getTextFromNode } from 'utils/dom';
import { isElementNode, nonNullable } from 'utils/guards';
import { removeEmpty } from 'utils/objects';

export const AniaGotujeProvider: Provider = (() => {
  const name = 'AniaGotuje.pl';
  const url = 'https://aniagotuje.pl/';

  const parseIngredients = (doc: Document) => {
    const root = doc.querySelector('[itemprop="recipeInstructions"] > .ads-slot-article + div');
    const ingredientsHeaders = root?.querySelectorAll<HTMLParagraphElement>('.ing-header');
    const ingredients: RecipeIngredient[] = [];

    // Single recipe
    if (ingredientsHeaders?.length === 0) {
      const groupItemsElement = root?.querySelectorAll('.recipe-ing-list [itemprop="recipeIngredient"]');
      const groupItems = Array.from(groupItemsElement ?? [])
        .map((item) => item.textContent?.trim())
        .filter(nonNullable)
        .map<RecipeIngredient>((text) => ({ text }));

      ingredients.push(...groupItems);

      return ingredients;
    }

    // Recipe with sub-recipes
    ingredientsHeaders?.forEach((ingHeader) => {
      const groupTitle = ingHeader.textContent?.trim();

      const groupItemsElement = ingHeader.nextElementSibling?.querySelectorAll('[itemprop="recipeIngredient"]');
      const groupItems = Array.from(groupItemsElement ?? [])
        .map((item) => item.textContent?.trim())
        .filter(nonNullable)
        .map<RecipeIngredient>((text) => ({ text, group: groupTitle }));

      ingredients.push(...groupItems);
    });

    return ingredients;
  };

  const parseInstructions = (doc: Document) => {
    const instructions: RecipeInstruction[] = [];
    let currentElement: Node | Element | null = doc.querySelector('[itemprop="recipeInstructions"] .recipe-ing-list + h2');
    let header: string | undefined;

    while (currentElement !== null && currentElement !== undefined) {
      if (
        isElementNode(currentElement)
        && ['H1', 'H2', 'H3', 'H4'].includes(currentElement.tagName)
      ) {
        header = currentElement.textContent?.trim();
      } else {
        const text = getTextFromNode(currentElement);

        if (text !== null && text.length > 0) {
          instructions.push({ text, group: header });
        }
      }

      currentElement = currentElement.nextSibling;
    }

    return instructions;
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const scrapper: RecipeScrapper = async (doc) => {
    const data = await microdataScrapper(doc);

    let color;
    if (data?.image) {
      const palette = await colorExtractor(data.image);
      color = palette.Vibrant?.hex;
    }

    const recipeName = doc.querySelector('.article-content [itemprop="name"]')?.textContent?.trim();

    const partial: Partial<Recipe> = {
      color,
      name: recipeName,
      ingredients: parseIngredients(doc),
      instructions: parseInstructions(doc),
    };

    return Object.assign(data, removeEmpty(partial));
  };

  return {
    name, url, scrapper, icon,
  };
})();
