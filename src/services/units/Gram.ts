import IntlMessageFormat from 'intl-messageformat';
import { Unit } from './Unit';

export class Gram extends Unit {
  pattern = /g|gram|gramy|gramów/;

  normalizedName = 'g';

  formatter = new IntlMessageFormat(`
    {quantity, plural,
      other {g}
    }
  `);
}
