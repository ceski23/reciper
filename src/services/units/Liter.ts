/* eslint-disable import/no-cycle */
import IntlMessageFormat from 'intl-messageformat';

import { Unit } from 'services/units/Unit';

export class Liter extends Unit {
  pattern = /l|litr|litry|litrów/;

  normalizedName = 'l';

  formatter = new IntlMessageFormat(`
    {quantity, plural,
      other {l}
    }
  `, 'pl-PL');
}
