import { type KnownIngredient } from 'features/recipes/ingredients'

export const KNOWN_INGREDIENTS = {
	chocolate: {
		name: 'czekolada',
		pattern: /\bczekolad(?:a|y)\b/u,
	},
	flour: {
		name: 'mąka',
		pattern: /\bmąk(?:i|a)\b/u,
	},
	chicken: {
		name: 'kurczak',
		pattern: /\bkurczak(?:a|)\b/u,
	},
	butter: {
		name: 'masło',
		pattern: /\bmasł(?:a|o)\b/u,
	},
	eggs: {
		name: 'jajka',
		pattern: /\bjaj(?:ko|ka|ek)?\b/u,
	},
	sugar: {
		name: 'cukier',
		pattern: /\bcuk(?:ru|ier)\b/u,
	},
	salt: {
		name: 'sól',
		pattern: /\b(?:soli|sól)\b/u,
	},
	pasta: {
		name: 'makaron',
		pattern: /\bmakaron(?:|u)\b/u,
	},
	milk: {
		name: 'mleko',
		pattern: /\bmlek(?:a|o)\b/u,
	},
	bakingpowder: {
		name: 'proszek do pieczenia',
		pattern: /\bprosz(?:ek|ku) do pieczenia\b/u,
	},
	bacon: {
		name: 'boczek',
		pattern: /\bbocz(?:ek|ku)\b/u,
	},
	cream: {
		name: 'śmietana',
		pattern: /śmietan(?:a|ka|ki)/u,
	},
	gorgonzola: {
		name: 'gorgonzola',
		pattern: /\bgorgonzol(?:a|i)\b/u,
	},
	bazil: {
		name: 'bazylia',
		pattern: /\bbazyl(?:ii|ia)\b/u,
	},
	tomato: {
		name: 'pomidor',
		pattern: /\bpomidor(?:|y|ów|ek|ki|ków)\b/u,
	},
} satisfies Record<string, KnownIngredient>

export type IngredientName = keyof typeof KNOWN_INGREDIENTS
