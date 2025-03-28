import * as v from 'valibot'

export const recipeScheme = v.object({
	id: v.pipe(v.string(), v.minLength(1)),
	name: v.pipe(v.string(), v.minLength(1)),
	image: v.optional(v.pipe(v.string(), v.minLength(1))),
	description: v.optional(v.pipe(v.string(), v.minLength(1))),
	ingredients: v.pipe(
		v.array(v.object({
			text: v.pipe(v.string(), v.minLength(1)),
			group: v.optional(v.pipe(v.string(), v.minLength(1))),
		})),
		v.minLength(1),
	),
	instructions: v.pipe(
		v.array(v.object({
			text: v.pipe(v.string(), v.minLength(1)),
			group: v.optional(v.pipe(v.string(), v.minLength(1))),
			image: v.optional(v.pipe(v.string(), v.minLength(1))),
		})),
		v.minLength(1),
	),
	prepTime: v.optional(v.pipe(v.number(), v.minValue(1))),
	color: v.optional(v.pipe(v.string(), v.minLength(1))),
	url: v.optional(v.pipe(v.string(), v.minLength(1))),
	rating: v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(5))),
	calories: v.optional(v.pipe(v.number(), v.minValue(1))),
	tags: v.optional(v.array(v.pipe(v.string(), v.minLength(1))), []),
	servings: v.optional(v.pipe(v.number(), v.minValue(1))),
	gallery: v.optional(v.array(v.pipe(v.string(), v.minLength(1))), []),
	addedDate: v.pipe(v.number(), v.minValue(1)),
	thumbhash: v.optional(v.pipe(v.string(), v.minLength(1))),
})

export type Recipe = v.InferOutput<typeof recipeScheme>
