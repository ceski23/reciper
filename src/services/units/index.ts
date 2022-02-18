/* eslint-disable import/no-cycle */

import { Cup } from 'services/units/Cup';
import { Gram } from 'services/units/Gram';
import { Kilogram } from 'services/units/Kilogram';
import { Liter } from 'services/units/Liter';
import { Milliliter } from 'services/units/Milliliter';
import { TableSpoon } from 'services/units/TableSpoon';
import { TeaSpoon } from 'services/units/TeaSpoon';

export const UNITS = [
  new Cup(),
  new TeaSpoon(),
  new TableSpoon(),
  new Kilogram(),
  new Gram(),
  new Milliliter(),
  new Liter(),
];
