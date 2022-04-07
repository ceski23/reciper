import { FieldErrors, FieldValues } from 'react-hook-form';
import { match, P } from 'ts-pattern';

import { RecipeFormFields } from 'components/recipes/forms/RecipeForm';

export const undefinedEmptyString = (value: string) => value || undefined;

export const fieldOptions = { setValueAs: undefinedEmptyString };

export const getFieldError = <T extends FieldValues>(
  errors: FieldErrors<RecipeFormFields>,
  field: keyof RecipeFormFields,
) => (
    match(errors[field])
    // FieldError
      .with({ message: P.string }, ({ message }) => message)
    // FieldError[]
      .with(P.array({ message: P.string }), (errs) => (
        errs.map((err) => err.message).filter(Boolean)[0]
      ))
      .otherwise(() => undefined)
  );

export const getMultiFieldError = <T extends FieldValues>(
  errors: FieldErrors<RecipeFormFields>,
  field: keyof RecipeFormFields,
  index: number,
) => (
    match(errors[field])
    // Array<{ value: FieldError }>
      .with(P.array({ value: P._ }), (errs) => (
        errs.map((err) => err.value?.message)[index]
      ))
      .otherwise(() => undefined)
  );
