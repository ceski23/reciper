import icon from 'assets/providers/kwestia_smaku.png';

import { Recipe } from 'services/recipes';
import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import microdataScrapper from 'services/recipes/providers/microdata';
import { colorExtractor } from 'services/recipes/providers/utils';

import { nonNullable } from 'utils/guards';

export const KwestiaSmakuProvider: Provider = (() => {
  const name = 'Kwestia Smaku';
  const url = 'https://www.kwestiasmaku.com/';

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const scrapper: RecipeScrapper = async (doc) => {
    const microdata = await microdataScrapper(doc);
    const description = doc.querySelector('.field-name-field-uwagi-wstepne')?.textContent || undefined;

    const instructionsElements = doc.querySelectorAll('.field-name-field-przygotowanie ul > li');
    const recipeInstructions = Array
      .from(instructionsElements)
      .map((elem) => elem.textContent?.trim())
      .filter(nonNullable)
      .map((text) => ({ text }));

    const ingredientsElements = doc.querySelectorAll('.field-name-field-skladniki > ul > li');
    const recipeIngredient = Array
      .from(ingredientsElements)
      .map((elem) => elem.textContent?.trim())
      .filter(nonNullable)
      .map((text) => ({ text }));

    const tagsElements = doc.querySelectorAll('#node-przepis-full-group-kategorie a');
    const tags = Array
      .from(tagsElements)
      .map((elem) => elem.textContent?.toLowerCase())
      .filter(nonNullable);

    let color;
    if (microdata?.image) {
      const palette = await colorExtractor(microdata.image);
      color = palette.Vibrant?.hex;
    }

    const partial: Partial<Recipe> = {
      ingredients: recipeIngredient,
      instructions: recipeInstructions,
      color,
      description,
      tags,
    };

    return Object.assign(microdata, partial);
  };

  return {
    name, url, scrapper, icon,
  };
})();
