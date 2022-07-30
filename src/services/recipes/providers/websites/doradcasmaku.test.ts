import { expect } from 'vitest';

import { Recipe } from 'services/recipes';
import { lemoniada } from 'services/recipes/providers/fixtures/doradcasmaku';
import { DoradcaSmakuProvider } from 'services/recipes/providers/websites/doradcasmaku';

const scrapeRecipe = async (data: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const partialRecipe = await DoradcaSmakuProvider.scrapper(doc);
  partialRecipe.id = '1';

  return partialRecipe;
};

describe('scrapper', () => {
  it('should scrape valid recipe', async () => {
    const recipe = await scrapeRecipe(lemoniada);
    expect(recipe).toEqual<Recipe>({
      id: '1',
      ingredients: [
        { text: 'cytryna 1 sztuki' },
        { text: 'lód' },
        { text: 'woda gazowana 300 mililitrów' },
        { text: 'grejpfrut różowy 2 sztuki' },
        { text: 'Cukier ze skórką cytryny do ciast i deserów Prymat 1 opakowanie' },
        { text: 'Kardamon mielony Prymat 1 łyżeczka' },
      ],
      instructions: [
        { text: '1. Cukier ze skórką cytryny oraz kardamon zalewamy odrobiną gorącej wody i mieszamy aż cukier się rozpuści.' },
        { text: '2. Wyciskamy sok z grejfruta i cytryny. Sprawdź jak wycisnąć sok z cytrusów bez pestek pod linkiem.' },
        { text: '3. Mieszamy wyciśnięty sok, wodę z cukrem i kardamonem, a następnie zalewamy gazowaną wodą.' },
        { text: '4. Lemoniadę należy schłodzić przed podaniem w lodówce lub dodać kostki lodu.' },
      ],
      name: 'Grejpfrutowa lemoniada z kardamonem',
      tags: [
        'Napoje',
      ],
      calories: undefined,
      color: '#7f7f7f',
      description: 'Przepis dla wielbicieli grejpfrutów, czyli cytrusowa lemoniada z sokiem grejpfrutowym i szczyptą egzotycznego kardamonu.',
      image: 'https://pliki.doradcasmaku.pl/grejfrutowa-lemoniada-z-kardamonem0-4.jpg',
      prepTime: 15,
      rating: 5,
      servings: 1,
    });
  });
});
