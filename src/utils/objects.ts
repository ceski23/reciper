import { nonNullable } from 'utils/guards';

export const removeEmpty = <T>(obj: T) => {
  const entries = Object.entries(obj);
  const filteredEntries = entries.filter(([, v]) => nonNullable(v));

  return Object.fromEntries(filteredEntries) as T;
};
