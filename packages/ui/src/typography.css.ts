import { theme } from './theme.css'
import { recipe } from '@vanilla-extract/recipes'
import { pxToRem } from './utils/style'

export const typography = recipe({
	variants: {
		variant: {
			displayLarge: {
				font: theme.typography.displayLarge,
			},
			displayMedium: {
				font: theme.typography.displayMedium,
			},
			displaySmall: {
				font: theme.typography.displaySmall,
			},
			headlineLarge: {
				font: theme.typography.headlineLarge,
			},
			headlineMedium: {
				font: theme.typography.headlineMedium,
			},
			headlineSmall: {
				font: theme.typography.headlineSmall,
			},
			titleLarge: {
				font: theme.typography.titleLarge,
			},
			titleMedium: {
				font: theme.typography.titleMedium,
			},
			titleSmall: {
				font: theme.typography.titleSmall,
			},
			bodyLarge: {
				font: theme.typography.bodyLarge,
			},
			bodyMedium: {
				font: theme.typography.bodyMedium,
			},
			bodySmall: {
				font: theme.typography.bodySmall,
				letterSpacing: pxToRem(0.1),
			},
			labelLarge: {
				font: theme.typography.labelLarge,
			},
			labelMedium: {
				font: theme.typography.labelMedium,
				letterSpacing: pxToRem(0.1),
			},
			labelSmall: {
				font: theme.typography.labelSmall,
				letterSpacing: pxToRem(0.1),
			},
		},
	},
})
