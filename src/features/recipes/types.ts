import { z } from 'zod'

export const recipeScheme = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	image: z.string().min(1).optional(),
	description: z.string().min(1).optional(),
	ingredients: z.array(z.object({
		text: z.string().min(1),
		group: z.string().min(1).optional(),
	})).min(1),
	instructions: z.array(z.object({
		text: z.string().min(1),
		group: z.string().min(1).optional(),
	})).min(1),
	prepTime: z.number().positive().optional(),
	color: z.string().min(1).optional(),
	url: z.string().min(1).optional(),
	rating: z.number().min(0).max(5).optional(),
	calories: z.number().positive().optional(),
	tags: z.array(z.string().min(1)),
	servings: z.number().positive().optional(),
	gallery: z.array(z.string().min(1)),
})

export type Recipe = z.infer<typeof recipeScheme>
