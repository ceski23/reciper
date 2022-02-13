import type { Provider, RecipeScrapper } from 'services/recipes/providers';
import jsonldScrapper from 'services/recipes/providers/jsonld';
import icon from 'assets/provider_icons/beszamel.svg';
import { colorExtractor } from 'services/recipes/providers/utils';

export const BeszamelProvider: Provider = (() => {
  const name = 'Beszamel';
  const url = 'https://beszamel.se.pl/';

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const scrapper: RecipeScrapper = async (doc) => {
    const data = await jsonldScrapper(doc);

    let color;
    if (data?.image) {
      const palette = await colorExtractor(data.image);
      color = palette.Vibrant?.hex;
    }

    return {
      ...data,
      color,
    };
  };

  return {
    name, url, scrapper, icon,
  };
})();
