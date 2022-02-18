import styled from '@emotion/styled/macro';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { reverse } from 'named-urls';
import { nanoid } from 'nanoid';
import { VFC } from 'react';
import {
  Controller, SubmitHandler, useFieldArray, useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import { ReactComponent as DeleteIcon } from 'assets/common/delete.svg';

import { Button, buttonStyles } from 'components/common/Button';
import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { Field } from 'components/forms/inputs/Field';
import { TagInput } from 'components/forms/inputs/TagInput';

import { useAppDispatch } from 'hooks/store';

import { urls } from 'routing/urls';

import { isValidRecipe } from 'services/recipes';

import { saveRecipe } from 'store/recipes';

import { fieldOptions, getArrayFieldsIndexError } from 'utils/forms';

const RecipeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
`;

const Textarea = styled.textarea`
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.textalt};
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
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const DeleteButton = styled.button`
  ${buttonStyles}
  display: flex;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 15px;
  min-width: unset;
`;

const ErrorText = styled.p`
  font-size: 13px;
  color: red;
`;

const FieldsArrayWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > button {
    margin-top: 40px;
  }
`;

const newRecipeSchema = z.object({
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

export type Fields = z.infer<typeof newRecipeSchema>;

export const NewManualRecipeScreen: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors }, control, watch,
  } = useForm<Fields>({
    resolver: zodResolver(newRecipeSchema),
    defaultValues: {
      calories: 0,
      prepTime: 0,
      servings: 0,
      tags: [],
    },
  });

  const ingredients = useFieldArray({
    name: 'ingredients',
    control,
  });

  const instructions = useFieldArray({
    name: 'instructions',
    control,
  });

  const recipeImage = watch('image');

  const onSubmit: SubmitHandler<Fields> = (data) => {
    const recipe = Object.fromEntries(Object
      .entries(data)
      .filter((([, value]) => {
        if (typeof value === 'number' && value === 0) return false;
        return true;
      }))
      .map(([key, value]) => {
        if (['ingredients', 'instructions'].includes(key)) {
          const items = value as Fields['ingredients'];
          return [key, items.map((i) => i.value)];
        }

        return [key, value];
      }));

    recipe.id = nanoid();

    if (recipe.prepTime && typeof recipe.prepTime === 'number') {
      recipe.prepTime = dayjs.duration({ minutes: recipe.prepTime }).toISOString();
    }

    if (isValidRecipe(recipe)) {
      dispatch(saveRecipe(recipe));
      navigate(reverse(urls.recipes.recipeById, {
        recipeId: recipe.id,
      }));
    } else throw Error('Invalid recipe');
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Nowy przepis" />

      <RecipeForm onSubmit={handleSubmit(onSubmit)}>
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
          error={errors.tags?.find((e) => e?.message)?.message}
        >
          <Controller
            name="tags"
            control={control}
            render={({ field: { ref, ...field } }) => <TagInput {...field} />}
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

          {getArrayFieldsIndexError(errors, 'ingredients') && (
            <ErrorText>
              {getArrayFieldsIndexError(errors, 'ingredients')}
            </ErrorText>
          )}

          {ingredients.fields.map((field, index) => (
            <FieldsWrapper key={field.id}>
              <Field
                label={`Składnik ${index + 1}`}
              // error={errors.ingredients?.[index].value?.message}
                {...register(`ingredients.${index}.value`)}
              />
              <DeleteButton type="button" onClick={() => ingredients.remove(index)}>
                <DeleteIcon />
              </DeleteButton>
            </FieldsWrapper>
          ))}

          <Button type="button" onClick={() => ingredients.append({ value: '' })}>
            Dodaj składnik
          </Button>
        </FieldsArrayWrapper>

        <FieldsArrayWrapper>
          <h2>Instrukcje</h2>

          {getArrayFieldsIndexError(errors, 'instructions') && (
            <ErrorText>
              {getArrayFieldsIndexError(errors, 'instructions')}
            </ErrorText>
          )}

          {instructions.fields.map((field, index) => (
            <FieldsWrapper key={field.id}>
              <Field
                label={`Krok ${index + 1}.`}
                error={errors.instructions?.[index].value?.message}
                {...register(`instructions.${index}.value`)}
              />
              <DeleteButton type="button" onClick={() => instructions.remove(index)}>
                <DeleteIcon />
              </DeleteButton>
            </FieldsWrapper>
          ))}

          <Button type="button" onClick={() => instructions.append({ value: '' })}>
            Dodaj krok
          </Button>
        </FieldsArrayWrapper>

        <Button type="submit" style={{ marginTop: 20 }}>Zapisz przepis</Button>
      </RecipeForm>
    </FluidContainer>
  );
};
