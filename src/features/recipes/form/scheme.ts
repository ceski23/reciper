import i18next from 'i18next'
import * as v from 'valibot'

export const recipeFormSchema = () =>
	v.object({
		name: v.string(i18next.t('newRecipe.form.name.required'), [
			v.minLength(1),
		]),
		image: v.optional(
			v.string([
				v.minLength(1),
				v.url(i18next.t('newRecipe.form.image.invalid')),
			]),
		),
		description: v.optional(
			v.string([
				v.minLength(1),
			]),
		),
		ingredients: v.array(
			v.object({
				items: v.array(v.object({
					text: v.string(i18next.t('newRecipe.form.ingredients.required'), [
						v.minLength(1, i18next.t('newRecipe.form.ingredients.required')),
					]),
				})),
				group: v.optional(
					v.string([
						v.minLength(1),
					]),
				),
			}),
			[
				v.minLength(1, i18next.t('newRecipe.form.ingredients.notEmpty')),
			],
		),
		instructions: v.array(
			v.object({
				items: v.array(v.object({
					text: v.string(i18next.t('newRecipe.form.instructions.required'), [
						v.minLength(1, i18next.t('newRecipe.form.instructions.required')),
					]),
				})),
				group: v.optional(
					v.string([
						v.minLength(1),
					]),
				),
			}),
			[
				v.minLength(1, i18next.t('newRecipe.form.ingredients.notEmpty')),
			],
		),
		prepTime: v.optional(v.coerce(
			v.number([
				v.minValue(1),
			]),
			Number,
		)),
		url: v.optional(
			v.string([
				v.minLength(1),
				v.url(i18next.t('newRecipe.form.url.invalid')),
			]),
		),
		calories: v.optional(v.coerce(
			v.number(i18next.t('newRecipe.form.calories.invalid'), [
				v.minValue(1, i18next.t('newRecipe.form.calories.invalid')),
			]),
			Number,
		)),
		tags: v.optional(
			v.array(
				v.object({
					text: v.string(i18next.t('newRecipe.form.tags.notEmpty'), [
						v.minLength(1),
					]),
				}),
			),
			[],
		),
		servings: v.optional(v.coerce(
			v.number(i18next.t('newRecipe.form.servings.invalid'), [
				v.minValue(1, i18next.t('newRecipe.form.servings.invalid')),
			]),
			Number,
		)),
		rating: v.optional(
			v.coerce(
				v.number(i18next.t('newRecipe.form.rating.invalid'), [
					v.minValue(1, i18next.t('newRecipe.form.rating.invalid')),
					v.maxValue(5, i18next.t('newRecipe.form.rating.invalid')),
				]),
				Number,
			),
		),
		gallery: v.optional(
			v.array(
				v.string([
					v.url(i18next.t('newRecipe.form.gallery.invalid')),
				]),
			),
			[],
		),
		color: v.optional(
			v.string(i18next.t('newRecipe.form.color.invalid'), [
				v.hexColor(i18next.t('newRecipe.form.color.invalid')),
			]),
		),
	})

export type RecipeFormValues = v.Output<ReturnType<typeof recipeFormSchema>>
