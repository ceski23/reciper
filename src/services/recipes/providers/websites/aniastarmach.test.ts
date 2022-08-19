// eslint-disable-next-line max-classes-per-file
import { expect } from 'vitest';

import { lemoniada, tortUrodzinowy } from 'services/recipes/providers/fixtures/aniastarmach';
import { AniaStarmachProvider } from 'services/recipes/providers/websites/aniastarmach';

vi.stubGlobal('Image', class {
  onload: () => void;

  constructor() {
    this.onload = vi.fn();
    setTimeout(() => this.onload());
  }
});

vi.mock('colorthief', () => ({
  default: class {
    // eslint-disable-next-line class-methods-use-this
    getColor = () => [0, 0, 0];

    getPalette = () => [this.getColor()];
  },
}));

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
