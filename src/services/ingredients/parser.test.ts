import { parseIngredient, ParsedIngredient } from 'services/ingredients/parser';
import { Unit } from 'services/units/Unit';

// const ingredients = [
//   'bazylia (1 doniczka)',
//   '50 g orzeszków pinii',
//   '50 g tartego sera grana padano',
//   '500 g filetu kurczaka',
//   '1/2 papryczki chili',
//   '1 łyżeczka skrobi ziemniaczanej',
//   '2 łyżki oleju kokosowego',
//   '1/2 małej cebuli',
//   '200 ml mleka kokosowego',
//   '1 łyżka sosu rybnego (lub sojowego)',
//   '2 łyżki posiekanego szczypiorku',
//   'do podania: 200 g białego ryżu',
//   '3/4 łyżeczki sody oczyszczonej',
//   '1 jajko',
//   '100 g czekoladowych dropsów lub posiekanej czekolady',
//   '1/4 szklanki kakao',
//   '1 szklanka cukru pudru',
//   '1/2 szklanki nutelli'
// ];

describe('grams', () => {
  test('decimal', () => {
    const ingredient = parseIngredient('1.5g drożdży');

    expect(ingredient).toEqual<ParsedIngredient>({
      original: '1.5g drożdży',
      quantity: 1.5,
      parsed: { begin: '', end: 'drożdży' },
      unit: Unit.fromAbbrev('g'),
    });
  });

  test('integer', () => {
    const ingredient = parseIngredient('300 g makaronu np. penne');

    expect(ingredient).toEqual<ParsedIngredient>({
      original: '300 g makaronu np. penne',
      quantity: 300,
      parsed: { begin: '', end: 'makaronu np. penne' },
      unit: Unit.fromAbbrev('g'),
    });
  });

  test('with type', () => {
    const ingredient = parseIngredient('500 g filetu kurczaka');

    expect(ingredient).toEqual<ParsedIngredient>({
      original: '500 g filetu kurczaka',
      quantity: 500,
      parsed: { begin: '', end: 'filetu kurczaka' },
      unit: Unit.fromAbbrev('g'),
      type: 'chicken',
    });
  });
});

describe('no unit', () => {
  test('no useful data', () => {
    const ingredient = parseIngredient('sól, pieprz');

    expect(ingredient).toEqual<ParsedIngredient>({
      original: 'sól, pieprz',
    });
  });

  test('fraction', () => {
    const ingredient = parseIngredient('sok z 1/4 limonki');

    expect(ingredient).toEqual<ParsedIngredient>({
      original: 'sok z 1/4 limonki',
      quantity: 0.25,
      parsed: { begin: 'sok z', end: 'limonki' },
    });
  });

  test('with type', () => {
    const ingredient = parseIngredient('1 podwójny filet kurczaka');

    expect(ingredient).toEqual<ParsedIngredient>({
      original: '1 podwójny filet kurczaka',
      quantity: 1,
      parsed: { begin: '', end: 'podwójny filet kurczaka' },
      type: 'chicken',
    });
  });
});

test('number with Tbs', () => {
  const ingredient = parseIngredient('5 łyżek oliwy extra');

  expect(ingredient).toEqual<ParsedIngredient>({
    original: '5 łyżek oliwy extra',
    quantity: 5,
    parsed: { begin: '', end: 'oliwy extra' },
    unit: Unit.fromAbbrev('Tbs'),
  });
});

test('decimal without Tsp', () => {
  const ingredient = parseIngredient('2.5 łyżeczki czerwonej pasty curry*');

  expect(ingredient).toEqual<ParsedIngredient>({
    original: '2.5 łyżeczki czerwonej pasty curry*',
    quantity: 2.5,
    parsed: { begin: '', end: 'czerwonej pasty curry*' },
    unit: Unit.fromAbbrev('tsp'),
  });
});

test('combined quantity with type', () => {
  const ingredient = parseIngredient('1 i 1/2 szklanki mąki pszennej');

  expect(ingredient).toEqual<ParsedIngredient>({
    original: '1 i 1/2 szklanki mąki pszennej',
    quantity: 1.5,
    parsed: { begin: '', end: 'mąki pszennej' },
    unit: Unit.fromAbbrev('cup'),
    type: 'flour',
  });
});
