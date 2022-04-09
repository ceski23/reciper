import styled from '@emotion/styled/macro';
import { zodResolver } from '@hookform/resolvers/zod';
import { VFC } from 'react';
import {
  Controller, SubmitHandler, useFieldArray, useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { ReactComponent as DeleteIcon } from 'assets/common/delete.svg';
import { ReactComponent as SaveIcon } from 'assets/common/diskette.svg';

import { Button } from 'components/common/Button';
import { Field } from 'components/forms/inputs/Field';
import { TagInput } from 'components/forms/inputs/TagInput';

import {
  fieldOptions, getFieldError, getMultiFieldError,
} from 'utils/forms';
import { color } from 'utils/styles/theme';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
`;

const Textarea = styled.textarea`
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${color('textalt')};
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  resize: vertical;
  min-height: 150px;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 30px;
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const ErrorText = styled.p`
  font-size: 13px;
  color: red;

  &:empty {
    display: none;
  }
`;

const FieldsArrayWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > button {
    margin-top: 40px;
  }
`;

const recipeSchema = z.object({
  name: z
    .string({ required_error: 'Nazwa przepisu jest wymagana' })
    .min(5, 'Minimalna długośc nazwy to 5 znaków'),
  description: z
    .string()
    .optional(),
  url: z.union([
    z.string().url('Nieprawidłowy adres URL'),
    z.undefined(),
  ]),
  image: z.union([
    z.string().url('Nieprawidłowy adres obrazka'),
    z.undefined(),
  ]),
  prepTime: z
    .number({ invalid_type_error: 'Niepoprawny czas przygotowania' })
    .min(0, 'Minimalny czas przygotowania to 0 minut')
    .int('Czas musi być liczbą całkowitą'),
  tags: z
    .array(z.string().min(3, 'Minimalna długość tagu to 3 znaki')),
  servings: z
    .number({ invalid_type_error: 'Niepoprawna ilość porcji' })
    .min(0, 'Minimalna ilość porcji to 0')
    .int('Ilość porcji musi być liczbą całkowitą'),
  calories: z
    .number({ invalid_type_error: 'Niepoprawna ilość kalorii' })
    .min(0, 'Minimalna ilość kalorii to 0')
    .int('Ilość kalorii musi być liczbą całkowitą'),
  ingredients: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, 'Składnik nie może być pusty'),
      }),
    )
    .min(1, 'Przepis musi mieć co najmniej 1 składnik'),
  instructions: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, 'Krok nie może być pusty'),
      }),
    )
    .min(1, 'Przepis musi mieć co najmniej 1 krok'),
});

export type RecipeFormFields = z.infer<typeof recipeSchema>;

interface Props {
  onSubmit: SubmitHandler<RecipeFormFields>;
  defaultValues?: RecipeFormFields;
}

export const RecipeForm: VFC<Props> = ({ defaultValues, onSubmit }) => {
  const {
    register, handleSubmit, formState: { errors }, control, watch,
  } = useForm<RecipeFormFields>({
    defaultValues,
    resolver: zodResolver(recipeSchema),
  });

  const recipeImage = watch('image');

  const ingredients = useFieldArray({
    name: 'ingredients',
    control,
  });

  const instructions = useFieldArray({
    name: 'instructions',
    control,
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Field
        label="Nazwa przepisu"
        error={errors.name?.message}
        {...register('name', fieldOptions)}
      />

      <Field
        label="Opis przepisu"
        error={errors.description?.message}
      >
        <Textarea
          {...register('description', fieldOptions)}
        />
      </Field>

      <Field
        label="Adres URL przepisu"
        error={errors.url?.message}
        {...register('url', fieldOptions)}
      />

      {recipeImage && !errors.image?.message && (
        <RecipeImage src={recipeImage} alt="Zdjęcie przepisu" />
      )}

      <Field
        label="Adres zdjęcia"
        error={errors.image?.message}
        {...register('image', fieldOptions)}
      />

      <Field
        label="Czas przygotowywania (w minutach)"
        error={errors.prepTime?.message}
        type="text"
        inputMode="numeric"
        {...register('prepTime', {
          valueAsNumber: true,
        })}
      />

      <Field
        label="Tagi"
        error={getFieldError(errors, 'tags')}
      >
        <Controller
          name="tags"
          control={control}
          render={({ field: { ref, ...field } }) => <TagInput {...field} />}
          defaultValue={[]}
        />
      </Field>

      <Field
        label="Ilość porcji"
        error={errors.servings?.message}
        type="text"
        inputMode="numeric"
        {...register('servings', {
          valueAsNumber: true,
        })}
      />

      <Field
        label="Kalorie"
        error={errors.calories?.message}
        type="text"
        inputMode="numeric"
        {...register('calories', {
          valueAsNumber: true,
        })}
      />

      <FieldsArrayWrapper>
        <h2>Składniki</h2>

        <ErrorText>{getFieldError(errors, 'ingredients')}</ErrorText>

        <FieldsWrapper>
          {ingredients.fields.map((field, index) => (
            <Field
              {...register(`ingredients.${index}.value`)}
              key={field.id}
              label={`Składnik ${index + 1}`}
              error={getMultiFieldError(errors, 'ingredients', index)}
              deleteIcon={DeleteIcon}
              onDeleteClick={() => ingredients.remove(index)}
            />
          ))}
        </FieldsWrapper>

        <Button type="button" size="small" onClick={() => ingredients.append({ value: '' })}>
          Dodaj składnik
        </Button>
      </FieldsArrayWrapper>

      <FieldsArrayWrapper>
        <h2>Instrukcje</h2>

        <ErrorText>{getFieldError(errors, 'instructions')}</ErrorText>

        <FieldsWrapper>
          {instructions.fields.map((field, index) => (
            <Field
              {...register(`instructions.${index}.value`)}
              key={field.id}
              label={`Krok ${index + 1}.`}
              error={getMultiFieldError(errors, 'instructions', index)}
              deleteIcon={DeleteIcon}
              onDeleteClick={() => instructions.remove(index)}
            />
          ))}
        </FieldsWrapper>

        <Button type="button" size="small" onClick={() => instructions.append({ value: '' })}>
          Dodaj krok
        </Button>
      </FieldsArrayWrapper>

      <Button variant="primary" type="submit" icon={SaveIcon} style={{ marginTop: 20 }}>
        Zapisz przepis
      </Button>
    </StyledForm>
  );
};
