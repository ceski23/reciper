import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { VFC } from 'react';
import {
  Controller, SubmitHandler, useFieldArray, useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { ReactComponent as SaveIcon } from 'assets/common/diskette.svg';

import { Button } from 'components/common/Button';
import { ImageUpload } from 'components/common/ImageUpload';
import { inputStyles } from 'components/common/Input';
import { DeletableField } from 'components/forms/inputs/DeletableField';
import { Field } from 'components/forms/inputs/Field';
import { NumberField } from 'components/forms/inputs/NumberField';
import { TagInput } from 'components/forms/inputs/TagInput';

import {
  fieldOptions, getFieldError, getMultiFieldError,
} from 'utils/forms';
import { media } from 'utils/styles/mediaQueries';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
`;

const Textarea = styled.textarea`
  ${inputStyles}
  min-height: 150px;
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
  margin: 0;
  margin-bottom: 20px;

  &:empty {
    display: none;
  }
`;

const FieldsArrayWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddButton = styled(Button)`
  ${FieldsWrapper} + & {
    margin-top: 20px;
  }
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  ${media.down('small')} {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: grid;
  gap: 30px;
`;

export const recipeSchema = z.object({
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
    .int('Czas musi być liczbą całkowitą')
    .or(z.nan().transform(() => undefined).optional()),
  tags: z
    .array(z.string().min(3, 'Minimalna długość tagu to 3 znaki'))
    .default([]),
  servings: z
    .number({ invalid_type_error: 'Niepoprawna ilość porcji' })
    .min(0, 'Minimalna ilość porcji to 0')
    .int('Ilość porcji musi być liczbą całkowitą')
    .or(z.nan().transform(() => undefined).optional()),
  calories: z
    .number({ invalid_type_error: 'Niepoprawna ilość kalorii' })
    .min(0, 'Minimalna ilość kalorii to 0')
    .int('Ilość kalorii musi być liczbą całkowitą')
    .or(z.nan().transform(() => undefined).optional()),
  ingredients: z
    .array(
      z.object({
        text: z
          .string()
          .min(1, 'Składnik nie może być pusty'),
      }),
    )
    .min(1, 'Przepis musi mieć co najmniej 1 składnik'),
  instructions: z
    .array(
      z.object({
        text: z
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
  'aria-labelledby'?: string;
  'aria-label'?: string;
}

export const RecipeForm: VFC<Props> = ({ defaultValues, onSubmit, ...props }) => {
  const {
    register, handleSubmit, formState: { errors }, control,
  } = useForm<RecipeFormFields>({
    defaultValues,
    resolver: zodResolver(recipeSchema),
  });

  const ingredients = useFieldArray({
    name: 'ingredients',
    control,
  });

  const instructions = useFieldArray({
    name: 'instructions',
    control,
  });

  const ingredientsErrors = getFieldError(errors, 'ingredients');
  const instructionsErrors = getFieldError(errors, 'instructions');

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <TwoColumns>
        <Column>
          <Field
            id="recipe-name"
            label="Nazwa przepisu"
            error={errors.name?.message}
            required={!recipeSchema.shape.name.isOptional()}
            {...register('name', fieldOptions)}
          />

          <Field<'textarea'>
            id="recipe-description"
            label="Opis przepisu"
            error={errors.description?.message}
            required={!recipeSchema.shape.description.isOptional()}
            {...register('description', fieldOptions)}
            render={(fieldProps) => <Textarea {...fieldProps} />}
          />

          <Field
            id="recipe-url"
            label="Adres URL przepisu"
            error={errors.url?.message}
            required={!recipeSchema.shape.url.isOptional()}
            {...register('url', fieldOptions)}
          />
        </Column>

        <Field
          id="recipe-image"
          label="Zdjęcie przepisu"
          error={errors.image?.message}
          required={!recipeSchema.shape.image.isOptional()}
          render={(fieldProps) => (
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImageUpload compress {...fieldProps} {...field} />
              )}
            />
          )}
        />
      </TwoColumns>

      <TwoColumns>
        <Column>
          <Field
            label="Czas przygotowywania (w minutach)"
            id="recipe-prepTime"
            error={errors.prepTime?.message}
            required={!recipeSchema.shape.prepTime.isOptional()}
            render={({ step, ...fieldProps }) => (
              <Controller
                name="prepTime"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <NumberField {...fieldProps} {...field} />
                )}
              />
            )}
          />

          <Field
            id="recipe-tags"
            label="Tagi"
            error={getFieldError(errors, 'tags')}
            required={!recipeSchema.shape.tags.isOptional()}
            render={(fieldProps) => (
              <Controller
                name="tags"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <TagInput {...fieldProps} {...field} />
                )}
                defaultValue={[]}
              />
            )}
          />
        </Column>

        <Column>
          <Field
            id="recipe-servings"
            label="Ilość porcji"
            error={errors.servings?.message}
            required={!recipeSchema.shape.servings.isOptional()}
            render={({ step, ...fieldProps }) => (
              <Controller
                name="servings"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <NumberField {...fieldProps} {...field} />
                )}
              />
            )}
          />

          <Field
            id="recipe-calories"
            label="Kalorie"
            error={errors.calories?.message}
            required={!recipeSchema.shape.calories.isOptional()}
            render={({ step, ...fieldProps }) => (
              <Controller
                name="calories"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <NumberField {...fieldProps} {...field} />
                )}
              />
            )}
          />
        </Column>
      </TwoColumns>

      <FieldsArrayWrapper>
        <h2>Składniki</h2>

        {ingredientsErrors && <ErrorText role="alert">{ingredientsErrors}</ErrorText>}

        {ingredients.fields.length > 0 && (
          <FieldsWrapper>
            {ingredients.fields.map((field, index) => (
              <Field
                id={field.id}
                {...register(`ingredients.${index}.text`)}
                key={field.id}
                label={`Składnik ${index + 1}`}
                error={getMultiFieldError(errors, 'ingredients', index)}
                required={!recipeSchema.shape.ingredients.element.isOptional()}
                render={(fieldProps) => (
                  <DeletableField onDeleteClick={() => ingredients.remove(index)} {...fieldProps} />
                )}
              />
            ))}
          </FieldsWrapper>
        )}

        <AddButton type="button" size="small" onClick={() => ingredients.append({ text: '' })}>
          Dodaj składnik
        </AddButton>
      </FieldsArrayWrapper>

      <FieldsArrayWrapper>
        <h2>Instrukcje</h2>

        {instructionsErrors && <ErrorText role="alert">{instructionsErrors}</ErrorText>}

        {instructions.fields.length > 0 && (
          <FieldsWrapper>
            {instructions.fields.map((field, index) => (
              <Field
                id={field.id}
                {...register(`instructions.${index}.text`)}
                key={field.id}
                label={`Krok ${index + 1}.`}
                error={getMultiFieldError(errors, 'instructions', index)}
                required={!recipeSchema.shape.instructions.element.isOptional()}
                render={(fieldProps) => (
                  <DeletableField
                    onDeleteClick={() => instructions.remove(index)}
                    {...fieldProps}
                  />
                )}
              />
            ))}
          </FieldsWrapper>
        )}

        <AddButton type="button" size="small" onClick={() => instructions.append({ text: '' })}>
          Dodaj krok
        </AddButton>
      </FieldsArrayWrapper>

      <Button variant="primary" type="submit" icon={SaveIcon} style={{ marginTop: 20 }}>
        Zapisz przepis
      </Button>
    </StyledForm>
  );
};
