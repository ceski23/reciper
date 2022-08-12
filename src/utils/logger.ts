/* eslint-disable testing-library/no-debugging-utils */
import debug from 'debug';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
localStorage.debug = import.meta.env.VITE_DEBUG ?? false;

const appLogger = debug('reciper');

export default appLogger;
