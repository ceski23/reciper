import type { IngredientName } from 'features/recipes/ingredients/ingredients'

export type KnownIngredient = {
	name: string
	pattern: RegExp
}

type UnknownIngredient = {
	original: string
}

type IngredientWithQuantity = {
	original: string
	parsed: {
		begin: string
		end: string
	}
	quantity: number
}

export type IngredientWithQuantityAndType = IngredientWithQuantity & {
	type: IngredientName
}

export type ParsedIngredient =
	| IngredientWithQuantity
	| UnknownIngredient
	| IngredientWithQuantityAndType
