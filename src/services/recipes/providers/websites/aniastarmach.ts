import icon from 'assets/providers/ania_starmach.png';

import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import jsonldScrapper from 'services/recipes/providers/jsonld';
import { colorExtractor } from 'services/recipes/providers/utils';

export const AniaStarmachProvider: Provider = (() => {
  const name = 'Ania Starmach';
  const url = 'https://aniastarmach.pl/';

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const scrapper: RecipeScrapper = async (doc) => {
    const data = await jsonldScrapper(doc);

    let color;
    if (data?.image) {
      const palette = await colorExtractor(data.image);
      color = palette.Vibrant?.hex;
    }

    const tagsElements = doc.querySelectorAll('.tags-wrapper a');
    const tags = Array
      .from(tagsElements)
      .map((elem) => elem.textContent?.toLowerCase())
      .filter(Boolean) as string[];

    return {
      ...data,
      color,
      tags,
    };
  };

  return {
    name, url, scrapper, icon,
  };
})();
