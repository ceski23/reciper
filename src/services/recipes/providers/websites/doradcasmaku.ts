/* eslint-disable no-restricted-syntax */
import icon from 'assets/providers/doradca_smaku.png';

import { Recipe, RecipeIngredient } from 'services/recipes';
import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import jsonldScrapper from 'services/recipes/providers/jsonld';

import { getTextFromNode } from 'utils/dom';
import { nonNullable } from 'utils/guards';
import { removeEmpty } from 'utils/objects';

export const DoradcaSmakuProvider: Provider = (() => {
  const name = 'Doradca smaku';
  const url = 'https://www.doradcasmaku.pl/';

  const parseIngredients = (doc: Document) => {
    const ingredientsGroups = doc.querySelectorAll('.recipe_ingredients_inner > .ingredients_group');
    const ingredients: RecipeIngredient[] = [];

    for (const ingredientsGroup of ingredientsGroups) {
      const group = ingredientsGroup.querySelector('.ingredients_group_title')?.textContent?.trim();

      const groupIngredients = Array
        .from(ingredientsGroup.querySelectorAll('.ingredients_list > li'))
        .map((elem) => getTextFromNode(elem).trim())
        .filter(nonNullable)
        .map<RecipeIngredient>((text) => removeEmpty({ text, group }));

      ingredients.push(...groupIngredients);
    }

    return ingredients;
  };

  const parseImages = (doc: Document) => {
    const imageElements = doc.querySelectorAll('.recipe_item .recipe_gallery img');
    const images = Array
      .from(imageElements)
      .map((elem) => elem.getAttribute('data-src'))
      .filter(nonNullable);

    return images;
  };

  const scrapper: RecipeScrapper = async (doc) => {
    const data = await jsonldScrapper(doc);

    const recipeImageElem = doc.querySelector('.recipe_item .recipe_gallery .img_wrapper img');
    const image = recipeImageElem?.getAttribute('data-src') ?? undefined;

    const instructionsElements = doc.querySelectorAll('.recipe-description__content > *');

    const instructions = Array
      .from(instructionsElements)
      .map(getTextFromNode)
      .filter(nonNullable)
      .map((text) => ({ text }));

    const tags = Array
      .from(doc.querySelectorAll('.recipe_tags > a'))
      .map(getTextFromNode)
      .filter(nonNullable)
      .map((text) => text.toLocaleLowerCase());

    const uniqueTags = Array.from(new Set([...tags, ...(data.tags ?? [])]));

    const partial: Partial<Recipe> = {
      image,
      instructions,
      ingredients: parseIngredients(doc),
      tags: uniqueTags,
      gallery: parseImages(doc),
    };

    return Object.assign(data, removeEmpty(partial));
  };

  return {
    name, url, scrapper, icon,
  };
})();
