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
				items: v.pipe(
					v.array(v.object({
						text: v.pipe(
							v.string(i18next.t('newRecipe.form.ingredients.required')),
							v.minLength(1, i18next.t('newRecipe.form.ingredients.required')),
						),
					})),
					v.minLength(1, i18next.t('newRecipe.form.ingredients.notEmpty')),
				),
				group: v.nullable(
					v.pipe(v.string(), v.minLength(1)),
				),
			})),
			v.minLength(1, i18next.t('newRecipe.form.ingredients.notEmpty')),
		),
		instructions: v.pipe(
			v.array(v.object({
				items: v.pipe(
					v.array(v.object({
						text: v.pipe(
							v.string(i18next.t('newRecipe.form.instructions.required')),
							v.minLength(1, i18next.t('newRecipe.form.instructions.required')),
						),
					})),
					v.minLength(1, i18next.t('newRecipe.form.instructions.notEmpty')),
				),
				group: v.nullable(
					v.pipe(v.string(), v.minLength(1)),
				),
			})),
			v.minLength(1, i18next.t('newRecipe.form.ingredients.notEmpty')),
		),
		prepTime: v.nullable(
			v.pipe(
				v.unknown(),
				v.transform(Number),
				v.number(),
				v.minValue(0),
			),
		),
		url: v.nullable(
			v.pipe(v.string(), v.minLength(1), v.url(i18next.t('newRecipe.form.url.invalid'))),
		),
		calories: v.nullable(
			v.pipe(
				v.unknown(),
				v.transform(Number),
				v.number(),
				v.minValue(0),
			),
		),
		tags: v.nullable(
			v.pipe(
				v.array(
					v.object({
						text: v.pipe(v.string(i18next.t('newRecipe.form.tags.notEmpty')), v.minLength(1)),
					}),
				),
				v.check(array =>
					array
						.map(item => item.text)
						.some((item, index, arr) => arr.indexOf(item) !== index) === false, i18next.t('newRecipe.form.tags.unique')),
			),
			[],
		),
		servings: v.nullable(
			v.pipe(
				v.unknown(),
				v.transform(Number),
				v.number(),
				v.minValue(1),
			),
		),
		rating: v.nullable(
			v.pipe(
				v.unknown(),
				v.transform(Number),
				v.number(),
				v.minValue(0),
				v.maxValue(5),
			),
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
