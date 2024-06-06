import i18next from 'i18next'
import * as v from 'valibot'

export const recipeFormSchema = () =>
	v.object({
		name: v.pipe(v.string(i18next.t('newRecipe.form.name.required')), v.minLength(1)),
		image: v.nullable(
			v.pipe(v.string(), v.minLength(1), v.url(i18next.t('newRecipe.form.image.invalid'))),
		),
		description: v.nullable(
			v.pipe(v.string(), v.minLength(1)),
		),
		ingredients: v.pipe(
			v.array(v.object({
				items: v.array(v.object({
					text: v.pipe(
						v.string(i18next.t('newRecipe.form.ingredients.required')),
						v.minLength(1, i18next.t('newRecipe.form.ingredients.required')),
					),
				})),
				group: v.nullable(
					v.pipe(v.string(), v.minLength(1)),
				),
			})),
			v.minLength(1, i18next.t('newRecipe.form.ingredients.notEmpty')),
		),
		instructions: v.pipe(
			v.array(v.object({
				items: v.array(v.object({
					text: v.pipe(
						v.string(i18next.t('newRecipe.form.instructions.required')),
						v.minLength(1, i18next.t('newRecipe.form.instructions.required')),
					),
				})),
				group: v.nullable(
					v.pipe(v.string(), v.minLength(1)),
				),
			})),
			v.minLength(1, i18next.t('newRecipe.form.ingredients.notEmpty')),
		),
		prepTime: v.nullable(v.pipe(v.unknown(), v.transform(Number))),
		url: v.nullable(
			v.pipe(v.string(), v.minLength(1), v.url(i18next.t('newRecipe.form.url.invalid'))),
		),
		calories: v.nullable(v.pipe(v.unknown(), v.transform(Number))),
		tags: v.nullable(
			v.array(
				v.object({
					text: v.pipe(v.string(i18next.t('newRecipe.form.tags.notEmpty')), v.minLength(1)),
				}),
			),
			[],
		),
		servings: v.nullable(v.pipe(v.unknown(), v.transform(Number))),
		rating: v.nullable(
			v.pipe(v.unknown(), v.transform(Number)),
		),
		gallery: v.nullable(
			v.array(
				v.pipe(v.string(), v.url(i18next.t('newRecipe.form.gallery.invalid'))),
			),
			[],
		),
		color: v.nullable(
			v.pipe(v.string(i18next.t('newRecipe.form.color.invalid')), v.hexColor(i18next.t('newRecipe.form.color.invalid'))),
		),
	})

export type RecipeFormValues = v.InferOutput<ReturnType<typeof recipeFormSchema>>
