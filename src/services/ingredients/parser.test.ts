import { ParsedIngredient } from 'services/ingredients/models';
import { parseIngredient } from 'services/ingredients/parser';

describe('parseIngredient', () => {
  it('should parse ingredient with unknown unit', () => {
    expect(parseIngredient('bazylia (1 doniczka)')).not.toHaveProperty('unit');

    expect(parseIngredient('sok z 1/4 limonki')).not.toHaveProperty('unit');

    expect(parseIngredient('3 mleka w proszku')).not.toHaveProperty('unit');

    expect(parseIngredient('1 jajko')).not.toHaveProperty('unit');

    expect(parseIngredient('1/2 papryczki chili')).not.toHaveProperty('unit');

    expect(parseIngredient('1/2 małej cebuli')).not.toHaveProperty('unit');
  });

  it('should parse unknown ingredient', () => {
    expect(parseIngredient('szczypta magii')).toStrictEqual({ original: 'szczypta magii' });
  });

  it('should parse ingredient with unit', () => {
    expect(parseIngredient('50 g orzeszków pinii')).toMatchObject<Partial<ParsedIngredient>>({
      unit: 'gram',
    });

    expect(parseIngredient('50 g tartego sera grana padano')).toMatchObject<Partial<ParsedIngredient>>({
      unit: 'gram',
    });

    expect(parseIngredient('200 ml mleka kokosowego')).toMatchObject<Partial<ParsedIngredient>>({
      unit: 'milliliter',
    });

    expect(parseIngredient('do podania: 200 g białego ryżu')).toMatchObject<Partial<ParsedIngredient>>({
      unit: 'gram',
    });
  });

  it('should parse ingredient without quantity', () => {
    expect(parseIngredient('szklanka cukru pudru')).not.toHaveProperty('quantity');

    expect(parseIngredient('szczypta soli i pieprzu')).not.toHaveProperty('quantity');

    expect(parseIngredient('kilka liści szafranu')).not.toHaveProperty('quantity');
  });

  it('should parse ingredient with quantity', () => {
    expect(parseIngredient('500 g filetu kurczaka')).toMatchObject<Partial<ParsedIngredient>>({
      quantity: 500,
    });

    expect(parseIngredient('1 łyżeczka skrobi ziemniaczanej')).toMatchObject<Partial<ParsedIngredient>>({
      quantity: 1,
    });

    expect(parseIngredient('1/4 szklanki kakao')).toMatchObject<Partial<ParsedIngredient>>({
      quantity: 0.25,
    });

    expect(parseIngredient('1 i 3/4 łyżeczki sody oczyszczonej')).toMatchObject<Partial<ParsedIngredient>>({
      quantity: 1.75,
    });

    expect(parseIngredient('2.5 łyżki posiekanego szczypiorku')).toMatchObject<Partial<ParsedIngredient>>({
      quantity: 2.5,
    });
  });

  it('should properly split text', () => {
    expect(parseIngredient('500 g filetu kurczaka')).toMatchObject<Partial<ParsedIngredient>>({
      parsed: { begin: '', end: 'filetu kurczaka' },
    });

    expect(parseIngredient('1 i 3/4 łyżeczki sody oczyszczonej')).toMatchObject<Partial<ParsedIngredient>>({
      parsed: { begin: '', end: 'sody oczyszczonej' },
    });

    expect(parseIngredient('bazylia (1 doniczka)')).toMatchObject<Partial<ParsedIngredient>>({
      parsed: { begin: 'bazylia (', end: 'doniczka)' },
    });

    expect(parseIngredient('sok z 1/4 limonki')).toMatchObject<Partial<ParsedIngredient>>({
      parsed: { begin: 'sok z', end: 'limonki' },
    });

    expect(parseIngredient('3 mleka w proszku')).toMatchObject<Partial<ParsedIngredient>>({
      parsed: { begin: '', end: 'mleka w proszku' },
    });

    expect(parseIngredient('2 główki kapusty')).toMatchObject<Partial<ParsedIngredient>>({
      parsed: { begin: '', end: 'główki kapusty' },
    });

    expect(parseIngredient('do podania: 200 g białego ryżu')).toMatchObject<Partial<ParsedIngredient>>({
      parsed: { begin: 'do podania:', end: 'białego ryżu' },
    });
  });
});
