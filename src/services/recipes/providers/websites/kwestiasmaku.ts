import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import microdataScrapper from 'services/recipes/providers/microdata';
import icon from 'assets/provider_icons/kwestia_smaku.png';
import { colorExtractor } from 'services/recipes/providers/utils';

export const KwestiaSmakuProvider: Provider = (() => {
  const name = 'Kwestia Smaku';
  const url = 'www.kwestiasmaku.com';

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const scrapper: RecipeScrapper = async (doc, url) => {
    const microdata = await microdataScrapper(doc, url);
    const description = doc.querySelector('.field-name-field-uwagi-wstepne')?.textContent || undefined;

    const instructionsElements = doc.querySelectorAll('.field-name-field-przygotowanie ul > li');
    const recipeInstructions = Array
      .from(instructionsElements)
      .map((elem) => elem.textContent?.trim())
      .filter(Boolean) as string[];

    const ingredientsElements = doc.querySelectorAll('.field-name-field-skladniki > ul > li');
    const recipeIngredient = Array
      .from(ingredientsElements)
      .map((elem) => elem.textContent?.trim())
      .filter(Boolean) as string[];

    const tagsElements = doc.querySelectorAll('#node-przepis-full-group-kategorie a');
    const tags = Array
      .from(tagsElements)
      .map((elem) => elem.textContent?.toLowerCase());

    let color;
    if (microdata?.image) {
      const palette = await colorExtractor(microdata.image);
      color = palette.Vibrant?.hex;
    }

    return Object.assign(microdata, {
      ingredients: recipeIngredient,
      instructions: recipeInstructions,
      color,
      description,
      tags,
    });
  };

  return {
    name, url, scrapper, icon,
  };
})();
