/* eslint-disable import/no-cycle */
import IntlMessageFormat from 'intl-messageformat';

import { Unit } from 'services/units/Unit';

export class Gram extends Unit {
  pattern = /\b(?:gramów|gramy|gram|g)\b/;

  normalizedName = 'g';

  formatter = new IntlMessageFormat(`
    {quantity, plural,
      other {g}
    }
  `, 'pl-PL');
}
