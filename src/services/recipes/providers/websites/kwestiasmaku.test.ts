import { expect } from 'vitest';

import { Recipe } from 'services/recipes';
import { lemoniada } from 'services/recipes/providers/fixtures/kwestiasmaku';
import { KwestiaSmakuProvider } from 'services/recipes/providers/websites/kwestiasmaku';

const scrapeRecipe = async (data: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const partialRecipe = await KwestiaSmakuProvider.scrapper(doc);
  partialRecipe.id = '1';

  return partialRecipe;
};

describe('scrapper', () => {
  it('should scrape valid recipe', async () => {
    const recipe = await scrapeRecipe(lemoniada);
    expect(recipe).toEqual<Recipe>({
      id: '1',
      ingredients: [
        { text: '3 cytryny' },
        { text: '1 limonka (lub 1 dodatkowa cytryna)' },
        { text: '2 pomarańcze' },
        { text: '7 łyżek cukru' },
        { text: '1 litr wody niegazowanej' },
        { text: '1 gałązka mięty' },
        { text: 'opcjonalnie: 4 nasiona kardamonu' },
      ],
      instructions: [
        { text: 'Cytrusy dokładnie wyszorować, następnie przekroić na połówki. Odkroić po jednej ćwiartce z 1 pomarańczy, 1 cytryny i limonki i pokroić je na plasterki. Włożyć do dzbanka, zasypać cukrem.' },
        { text: 'Z reszty owoców wycisnąć sok, np. za pomocą wyciskarki, pozbywając się pestek i nadmiaru miąższu. Sok przelać do dzbanka z owocami.' },
        { text: 'Dodać wodę i gałązkę mięty. Dokładnie wymieszać. W razie potrzeby można dodać więcej wody i cukru (zależy od tego jak soczyste były cytryny).' },
      ],
      name: 'Lemoniada',
      tags: [
        'napoje',
        'cytryny',
        'pomarańcze',
        'przyjęcia i imprezy',
        'dla dzieci',
        'sylwester',
        'na upały',
        'kardamon',
      ],
      calories: undefined,
      color: '#7f7f7f',
      description: undefined,
      image: 'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/lemoniada_00.jpg',
      prepTime: undefined,
      rating: 4.84,
      servings: 4,
    });
  });
});
