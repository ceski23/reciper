import { expect } from 'vitest';

import { lemoniada, tort } from 'services/recipes/providers/fixtures/beszamel';
import { BeszamelProvider } from 'services/recipes/providers/websites/beszamel';

const scrapeRecipe = async (data: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const partialRecipe = await BeszamelProvider.scrapper(doc);
  partialRecipe.id = '1';

  return partialRecipe;
};

describe('scrapper', () => {
  it('should scrape valid recipe', async () => {
    const recipe = await scrapeRecipe(lemoniada);
    expect(recipe).toMatchSnapshot();
  });

  it('should scrape valid recipe with ingredients groups', async () => {
    const recipe = await scrapeRecipe(tort);
    expect(recipe).toMatchSnapshot();
  });
});
