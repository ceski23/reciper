import { expect } from 'vitest';

import { tortTruskawkowy } from 'services/recipes/providers/fixtures/aniagotuje';
import { AniaGotujeProvider } from 'services/recipes/providers/websites/aniagotuje';

const scrapeRecipe = async (data: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const partialRecipe = await AniaGotujeProvider.scrapper(doc);
  partialRecipe.id = '1';

  return partialRecipe;
};

describe('scrapper', () => {
  it('should scrape valid recipe with ingredients groups', async () => {
    const recipe = await scrapeRecipe(tortTruskawkowy);
    expect(recipe).toMatchSnapshot();
  });
});
