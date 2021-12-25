import IntlMessageFormat from 'intl-messageformat';
import { Unit } from './Unit';

export class Milliliter extends Unit {
  pattern = /ml|mililitr|mililitry|mililitrów/;

  normalizedName = 'ml';

  formatter = new IntlMessageFormat(`
    {quantity, plural,
      other {ml}
    }
  `);
}
