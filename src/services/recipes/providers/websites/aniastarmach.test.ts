import { expect } from 'vitest';

import { Recipe } from 'services/recipes';
import { lemoniada } from 'services/recipes/providers/fixtures/aniastarmach';
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
    expect(recipe).toEqual<Recipe>({
      id: '1',
      ingredients: [
        { text: '4 cytryny' },
        { text: '1 pomarańcza' },
        { text: '1 garść świeżej mięty' },
        { text: '100 g cukru' },
        { text: '1 l wody niegazowanej (jeśli lubisz wodę gazowaną, możesz ją wymieszać pół na pół z niegazowaną)' },
      ],
      instructions: [
        { text: 'Z owoców wyciśnij sok, przelej przez sitko, aby pozbyć się pestek.' },
        { text: 'Miętę utrzyj z cukrem w moździerzu lub w wysokim naczyniu (wtedy użyj łyżki).' },
        { text: 'Do dzbanka przelej sok z owoców. Dodaj miętę utartą z cukrem i wodę, wymieszaj.' },
        { text: 'Lemoniada smakuje najlepiej, gdy jest schłodzona (jeśli nie masz czasu na chłodzenie, dodaj po prostu kilka kostek lodu).' },
      ],
      name: 'Najlepsza lemoniada',
      tags: [
        'cytryna', 'lemoniada', 'mięta', 'na słodko', 'napój', 'pomarańcza', 'wegetariańskie',
      ],
      calories: undefined,
      color: '#7f7f7f',
      description: 'Orzeźwiająca i obłędnie cytrynowa. Lemoniada na upalne dni.',
      image: 'https://aniastarmach.pl/content/uploads/2016/05/najlepsza-lemoniada-5-1200x630.jpg',
      prepTime: 15,
      rating: undefined,
      servings: 4,
    });
  });
});
