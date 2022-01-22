/* eslint-disable import/no-cycle */
import IntlMessageFormat from 'intl-messageformat';
import { Unit } from './Unit';

export class Kilogram extends Unit {
  pattern = /kg|kilogram|kilogramy|kilogramów/;

  normalizedName = 'kg';

  formatter = new IntlMessageFormat(`
    {quantity, plural,
      other {kg}
    }
  `, 'pl-PL');
}
