/* eslint-disable import/no-cycle */
import IntlMessageFormat from 'intl-messageformat';

import { Unit } from 'services/units/Unit';

export class TableSpoon extends Unit {
  pattern = /łyżka|łyżki|łyżek|łyżkę/;

  normalizedName = 'Tbs';

  formatter = new IntlMessageFormat(`
    {quantity, plural,
      one {łyżka}
      few {łyżki}
      many {łyżek}
      other {łyżki}
    }
  `, 'pl-PL');
}
