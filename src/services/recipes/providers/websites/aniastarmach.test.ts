import { expect } from 'vitest';

import { lemoniada, tortUrodzinowy } from 'services/recipes/providers/fixtures/aniastarmach';
import { AniaStarmachProvider } from 'services/recipes/providers/websites/aniastarmach';

const scrapeRecipe = async (data: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const partialRecipe = await AniaStarmachProvider.scrapper(doc);
  partialRecipe.id = '1';

  return partialRecipe;
};

describe('scrapper', () => {
  it('should scrape valid recipe', async () => {
    const recipe = await scrapeRecipe(lemoniada);
    expect(recipe).toMatchSnapshot();
  });

  it('should scrape valid recipe with ingredients groups', async () => {
    const recipe = await scrapeRecipe(tortUrodzinowy);
    expect(recipe).toMatchSnapshot();
  });
});
