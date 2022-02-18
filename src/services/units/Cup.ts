/* eslint-disable import/no-cycle */
import IntlMessageFormat from 'intl-messageformat';

import { Unit } from 'services/units/Unit';

export class Cup extends Unit {
  pattern = /szklan(?:ka|ki|ek)/;

  normalizedName = 'cup';

  formatter = new IntlMessageFormat(`
    {quantity, plural,
      one {szklanka}
      few {szklanki}
      many {szklanek}
      other {szklanki}
    }
  `, 'pl-PL');
}
