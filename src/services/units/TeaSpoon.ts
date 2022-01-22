/* eslint-disable import/no-cycle */
import IntlMessageFormat from 'intl-messageformat';
import { Unit } from './Unit';

export class TeaSpoon extends Unit {
  pattern = /łyżeczka|łyżeczki|łyżeczek/;

  normalizedName = 'tsp';

  formatter = new IntlMessageFormat(`
    {quantity, plural,
      one {łyżeczka}
      few {łyżeczki}
      many {łyżeczek}
      other {łyżeczki}
    }
  `, 'pl-PL');
}
