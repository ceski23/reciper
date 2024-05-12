import * as v from 'valibot'

export const recipeScheme = v.object({
	id: v.string([v.minLength(1)]),
	name: v.string([v.minLength(1)]),
	image: v.optional(v.string([v.minLength(1)])),
	description: v.optional(v.string([v.minLength(1)])),
	ingredients: v.array(
		v.object({
			text: v.string([v.minLength(1)]),
			group: v.optional(v.string([v.minLength(1)])),
		}),
		[v.minLength(1)],
	),
	instructions: v.array(
		v.object({
			text: v.string([v.minLength(1)]),
			group: v.optional(v.string([v.minLength(1)])),
			image: v.optional(v.string([v.minLength(1)])),
		}),
		[v.minLength(1)],
	),
	prepTime: v.optional(v.number([v.minValue(1)])),
	color: v.optional(v.string([v.minLength(1)])),
	url: v.optional(v.string([v.minLength(1)])),
	rating: v.optional(v.number([v.minValue(1), v.maxValue(5)])),
	calories: v.optional(v.number([v.minValue(1)])),
	tags: v.optional(v.array(v.string([v.minLength(1)])), []),
	servings: v.optional(v.number([v.minValue(1)])),
	gallery: v.optional(v.array(v.string([v.minLength(1)])), []),
	addedDate: v.number([v.minValue(1)]),
})

export type Recipe = v.Output<typeof recipeScheme>
