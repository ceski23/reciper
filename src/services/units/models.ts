import IntlMessageFormat from 'intl-messageformat';

export interface UnitType {
  pattern: RegExp;
  abbreviation: string;
  formatter: IntlMessageFormat;
}
