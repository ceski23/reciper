import IntlMessageFormat from 'intl-messageformat';

import { UnitType } from 'services/units/models';

const createUnits = <T extends string>(units: Record<T, UnitType>): Record<T, UnitType> => units;

export const units = createUnits({
  cup: {
    pattern: /szklan(?:ka|ki|ek)/,
    abbreviation: 'cup',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {szklanka}
        few {szklanki}
        many {szklanek}
        other {szklanki}
      }
    `, 'pl-PL'),
  },
  teaspoon: {
    pattern: /łyżeczka|łyżeczki|łyżeczek/,
    abbreviation: 'tsp',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {łyżeczka}
        few {łyżeczki}
        many {łyżeczek}
        other {łyżeczki}
      }
    `, 'pl-PL'),
  },
  tablespoon: {
    pattern: /łyżka|łyżki|łyżek|łyżkę/,
    abbreviation: 'Tbs',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {łyżka}
        few {łyżki}
        many {łyżek}
        other {łyżki}
      }
    `, 'pl-PL'),
  },
  kilogram: {
    pattern: /(?:kg|kilogramy|kilogramów|kilogram)(?=$|\s)/,
    abbreviation: 'kg',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {kilogram}
        few {kilogramy}
        many {kilogramów}
        other {kilograma}
      }
    `, 'pl-PL'),
  },
  gram: {
    pattern: /(?:gramów|gramy|gram|g)(?=$|\s)/,
    abbreviation: 'g',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {gram}
        few {gramy}
        many {gramów}
        other {grama}
      }
    `, 'pl-PL'),
  },
  milliliter: {
    pattern: /(?:ml|mililitr|mililitry|mililitrów)(?=$|\s)/,
    abbreviation: 'ml',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {mililitr}
        few {mililitry}
        many {mililitrów}
        other {mililitra}
      }
    `, 'pl-PL'),
  },
  liter: {
    pattern: /(?:l|litr|litry|litrów)(?=$|\s)/,
    abbreviation: 'l',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {litr}
        few {litry}
        many {litrów}
        other {litra}
      }
    `, 'pl-PL'),
  },
  bar: {
    pattern: /tabliczka|tabliczki|tabliczek/,
    abbreviation: 'bar',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {tabliczka}
        few {tabliczki}
        many {tabliczek}
        other {tabliczki}
      }
    `, 'pl-PL'),
  },
  cube: {
    pattern: /kostka|kostki|kostek/,
    abbreviation: 'cube',
    formatter: new IntlMessageFormat(`
      {quantity, plural,
        one {kostka}
        few {kostki}
        many {kostek}
        other {kostki}
      }
    `, 'pl-PL'),
  },
});

export type UnitName = keyof typeof units;
