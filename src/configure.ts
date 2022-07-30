import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import 'core-js/proposals/set-methods';

import 'dayjs/locale/pl';

dayjs.extend(duration);
dayjs.extend(relativeTime);
