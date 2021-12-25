import { IntlMessageFormat } from 'intl-messageformat';
import { UNITS } from '.';

export abstract class Unit {
  abstract pattern: RegExp;

  abstract normalizedName: string;

  abstract formatter: IntlMessageFormat;

  static fromPattern(text: string) {
    return UNITS.find((unit) => unit.pattern.test(text));
  }

  static fromAbbrev(text: string) {
    return UNITS.find((unit) => unit.normalizedName === text);
  }
}
