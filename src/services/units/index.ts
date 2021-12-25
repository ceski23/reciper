import { Cup } from './Cup';
import { Gram } from './Gram';
import { Kilogram } from './Kilogram';
import { Liter } from './Liter';
import { Milliliter } from './Milliliter';
import { TableSpoon } from './TableSpoon';
import { TeaSpoon } from './TeaSpoon';

export const UNITS = [
  new Cup(),
  new TeaSpoon(),
  new TableSpoon(),
  new Kilogram(),
  new Gram(),
  new Milliliter(),
  new Liter(),
];
