import z from 'zod';

import { recipeSchema } from 'components/recipes/forms/RecipeForm';

const validateSchema = <T extends z.ZodTypeAny>(
  schema: T,
  data: Partial<Record<keyof z.infer<T>, unknown>>,
): z.ZodFormattedError<z.infer<T>> | Record<string, never> => {
  try {
    schema.parse(data);
    return {};
  } catch (error) {
    const errors = (error as z.ZodError<z.infer<T>>).format();
    return errors;
  }
};

const validateRecipeField = (key: keyof z.infer<typeof recipeSchema>, value: unknown) => (
  !(validateSchema(recipeSchema, { [key]: value })[key])
);

describe('RecipeForm schema', () => {
  it('should have valid name', () => {
    expect(validateRecipeField('name', '')).toBeFalsy();
    expect(validateRecipeField('name', 'test')).toBeFalsy();
    expect(validateRecipeField('name', 0)).toBeFalsy();
  });

  it('should have valid description', () => {
    expect(validateRecipeField('description', 0)).toBeFalsy();
  });

  it('should have valid url', () => {
    expect(validateRecipeField('url', '')).toBeFalsy();
    expect(validateRecipeField('url', 'test')).toBeFalsy();
    expect(validateRecipeField('url', 0)).toBeFalsy();
  });

  it('should have valid image', () => {
    expect(validateRecipeField('image', '')).toBeFalsy();
    expect(validateRecipeField('image', 'test')).toBeFalsy();
    expect(validateRecipeField('image', 0)).toBeFalsy();
  });

  it('should have valid prepTime', () => {
    expect(validateRecipeField('prepTime', 'test')).toBeFalsy();
    expect(validateRecipeField('prepTime', -1)).toBeFalsy();
    expect(validateRecipeField('prepTime', 0.1)).toBeFalsy();
  });

  it('should have valid tags', () => {
    expect(validateRecipeField('tags', ['t', 'te'])).toBeFalsy();
  });

  it('should have valid servings', () => {
    expect(validateRecipeField('servings', 'test')).toBeFalsy();
    expect(validateRecipeField('servings', -1)).toBeFalsy();
    expect(validateRecipeField('servings', 0.1)).toBeFalsy();
  });

  it('should have valid calories', () => {
    expect(validateRecipeField('calories', 'test')).toBeFalsy();
    expect(validateRecipeField('calories', -1)).toBeFalsy();
    expect(validateRecipeField('calories', 0.1)).toBeFalsy();
  });

  it('should have valid ingredients', () => {
    expect(validateRecipeField('ingredients', [])).toBeFalsy();
    expect(validateRecipeField('ingredients', [{ text: '' }])).toBeFalsy();
    expect(validateRecipeField('ingredients', [{ text: 3 }])).toBeFalsy();
  });

  it('should have valid instructions', () => {
    expect(validateRecipeField('instructions', [])).toBeFalsy();
    expect(validateRecipeField('instructions', [{ text: '' }])).toBeFalsy();
    expect(validateRecipeField('instructions', [{ text: 3 }])).toBeFalsy();
  });
});
