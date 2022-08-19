/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable no-restricted-syntax */
import icon from 'assets/providers/kwestia_smaku.png';

import { Recipe, RecipeIngredient, RecipeInstruction } from 'services/recipes';
import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import microdataScrapper from 'services/recipes/providers/microdata';
import { getColorFromImage } from 'services/recipes/providers/utils';

import { getTextFromNode } from 'utils/dom';
import { nonNullable } from 'utils/guards';
import appLogger from 'utils/logger';
import { removeEmpty } from 'utils/objects';

const log = appLogger.extend('scrapper:kwestiasmaku');

export const KwestiaSmakuProvider: Provider = (() => {
  const name = 'Kwestia Smaku';
  const url = 'https://www.kwestiasmaku.com/';

  const parseIngredients = (doc: Document) => {
    const ingredientsRoot = doc.querySelector('.field-name-field-skladniki');
    if (!ingredientsRoot) return [];

    // Multiple ingredients groups
    if (ingredientsRoot.querySelector('.wyroznione')) {
      let group: string | undefined;
      const ingredients: RecipeIngredient[] = [];

      for (const element of ingredientsRoot.children) {
        if (element.tagName === 'DIV') {
          group = element.textContent?.trim() ?? undefined;
        } else {
          const recipeIngredients = Array
            .from(element.querySelectorAll('li'))
            .map((elem) => elem.textContent?.trim())
            .filter(nonNullable)
            .map<RecipeInstruction>((text) => ({ text, group }));

          ingredients.push(...recipeIngredients);
        }
      }

      return ingredients;
    }

    // Signle ingredients group
    const ingredientsElements = ingredientsRoot.querySelectorAll('ul > li');
    const recipeIngredients = Array
      .from(ingredientsElements)
      .map((elem) => elem.textContent?.trim())
      .filter(nonNullable)
      .map((text) => ({ text }));

    return recipeIngredients;
  };

  const parseInstructions = (doc: Document) => {
    const instructionsRoot = doc.querySelector('.field-name-field-przygotowanie');
    if (!instructionsRoot) return [];

    // Multiple instruction groups
    if (instructionsRoot.querySelector('.wyroznione')) {
      let group: string | undefined;
      const instructions: RecipeInstruction[] = [];

      for (const element of instructionsRoot.children) {
        if (element.tagName === 'DIV') {
          group = element.textContent?.trim() ?? undefined;
        } else {
          const recipeInstructions = Array
            .from(element.querySelectorAll('li'))
            .map((elem) => getTextFromNode(elem).trim())
            .filter(nonNullable)
            .map<RecipeInstruction>((text) => ({ text, group }));

          instructions.push(...recipeInstructions);
        }
      }

      return instructions;
    }

    // Signle instructions group
    const instructionsElements = instructionsRoot.querySelectorAll('ul > li');
    const recipeInstructions = Array
      .from(instructionsElements)
      .map((elem) => getTextFromNode(elem).trim())
      .filter(nonNullable)
      .map((text) => ({ text }));

    return recipeInstructions;
  };

  const parseImages = (doc: Document) => {
    log('looking for images');

    const imageElements = doc.querySelectorAll('.view-zdjecia img');
    const images = Array
      .from(imageElements)
      .map((elem) => elem.getAttribute('src'))
      .filter(nonNullable);

    log('found images:', images);

    return images;
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const scrapper: RecipeScrapper = async (doc) => {
    const microdata = await microdataScrapper(doc);
    const description = doc.querySelector('.field-name-field-uwagi-wstepne')?.textContent?.trim() || undefined;

    const tagsElements = doc.querySelectorAll('#node-przepis-full-group-kategorie a');
    const tags = Array
      .from(tagsElements)
      .map((elem) => elem.textContent?.toLowerCase())
      .filter(nonNullable);

    const servingsElement = doc.querySelector('.field-name-field-ilosc-porcji');
    const servings = servingsElement?.textContent
      ? Number.parseInt(servingsElement.textContent, 10)
      : undefined;

    const color = microdata.image ? await getColorFromImage(microdata.image) : undefined;

    const partial: Partial<Recipe> = {
      ingredients: parseIngredients(doc),
      instructions: parseInstructions(doc),
      color,
      description,
      tags,
      servings,
      gallery: parseImages(doc),
    };

    return Object.assign(microdata, removeEmpty(partial));
  };

  return {
    name, url, scrapper, icon,
  };
})();
