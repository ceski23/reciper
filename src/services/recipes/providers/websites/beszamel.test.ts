import { expect } from 'vitest';

import { Recipe } from 'services/recipes';
import { lemoniada } from 'services/recipes/providers/fixtures/beszamel';
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
    expect(recipe).toEqual<Recipe>({
      id: '1',
      ingredients: [
        { text: '2 pomarańcze' },
        { text: 'sok z 2 pomarańczy' },
        { text: '2 cytryny' },
        { text: 'sok z 1 cytryny' },
        { text: '2 limonki' },
        { text: 'sok z 2 limonek' },
        { text: 'syrop przygotowany z 2 litrów wody i 8 łyżek cukru' },
      ],
      instructions: [
        { text: 'Cytrusy umyć i pokroić w plasterki.' },
        { text: 'Wlać do dzbanka sok wyciśnięty z cytrusów i syrop cukrowy, a następnie dodać do niego pokrojone w plasterki owoce.' },
        { text: 'Całość wstawić na kilka godzin do lodówki.' },
        { text: 'Podawać z plasterkami owoców i lodem.' },
      ],
      name: 'Lemoniada cytrusowa - przepis na lemoniadę z cytryn, limonek i pomarańczy',
      tags: [
        'napoje',
        'napoje alkoholowe',
        'koktajle',
        'kompoty',
        'soki',
        'kawa i herbata',
      ],
      calories: undefined,
      color: '#7f7f7f',
      description: 'Lemoniada z limonek, cytryn i pomarańczy to bardzo prosty w przygotowaniu i niezwykle smaczny napój na upalne dni. Podajemy dobry przepis na lemoniadę cytrusową. Sprawdź, jak ją przygotować.',
      image: 'https://cdn.galleries.smcloud.net/t/photos/gf-EQGW-RBcL-arZc_lemoniada-cytrusowa-przepis-na-lemoniade-z-cytryn-limonek-i-pomaranczy.jpg',
      prepTime: 15,
      rating: undefined,
      servings: 4,
    });
  });
});
