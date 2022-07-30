import { expect } from 'vitest';

import { isValidRecipe } from 'services/recipes';
import { chooseProvider, InvalidRecipeError, scrapeRecipe } from 'services/recipes/providers';
import { DefaultProvider } from 'services/recipes/providers/default';
import { AniaStarmachProvider } from 'services/recipes/providers/websites/aniastarmach';
import { BeszamelProvider } from 'services/recipes/providers/websites/beszamel';
import { DoradcaSmakuProvider } from 'services/recipes/providers/websites/doradcasmaku';
import { KwestiaSmakuProvider } from 'services/recipes/providers/websites/kwestiasmaku';

describe('chooseProvider', () => {
  it('should select AniaStarmach provider', () => {
    const provider = chooseProvider('https://aniastarmach.pl/przepis/najlepsza-lemoniada/');
    expect(provider.name).toBe(AniaStarmachProvider.name);
  });

  it('should select Beszamel provider', () => {
    const provider = chooseProvider('https://beszamel.se.pl/przepisy/napoje/lemoniada-cytrusowa-przepis-na-lemoniade-z-cytryn-limonek-i-pomaranczy-re-CWgR-BbAw-BWFs.html');
    expect(provider.name).toBe(BeszamelProvider.name);
  });

  it('should select DoradcaSmaku provider', () => {
    const provider = chooseProvider('https://www.doradcasmaku.pl/przepis-grejpfrutowa-lemoniada-z-kardamonem-412586');
    expect(provider.name).toBe(DoradcaSmakuProvider.name);
  });

  it('should select KwestiaSmaku provider', () => {
    const provider = chooseProvider('https://www.kwestiasmaku.com/drinki/drinki_bezalkoholowe/lemoniada/przepis.html');
    expect(provider.name).toBe(KwestiaSmakuProvider.name);
  });

  it('should select default provider', () => {
    const provider = chooseProvider('https://randomrecipeswebsite.test');
    expect(provider.name).toBe(DefaultProvider.name);
  });
});

describe('scrapeRecipe', () => {
  it('should scrape valid recipe', async () => {
    const recipe = await scrapeRecipe('https://aniastarmach.pl/przepis/najlepsza-lemoniada/');
    expect(recipe).toSatisfy(isValidRecipe);
  });

  it('should throw error on invalid recipe', async () => {
    await expect(scrapeRecipe('https://test.test/przepis/')).rejects.toThrow(InvalidRecipeError);
  });
});
