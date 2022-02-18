/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FieldError, FieldErrors } from 'react-hook-form';

import { Fields } from 'views/recipes/NewManualRecipeScreen';

export const undefinedEmptyString = (value: string) => value || undefined;

export const fieldOptions = { setValueAs: undefinedEmptyString };

export const getArrayFieldsIndexError = (errors: FieldErrors<Fields>, field: keyof Fields) => {
  if (errors[field] === undefined) return undefined;
  if (Array.isArray(errors[field])) return undefined;

  const error = errors[field] as FieldError;
  return error.message;
};
