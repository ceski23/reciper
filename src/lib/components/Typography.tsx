import { Role } from '@ariakit/react'
import { styleVariants } from '@macaron-css/core'
import { type ComponentProps } from 'react'
import { styleUtils } from 'lib/styles'

export const typography = styleVariants({
	displayLarge: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 57,
		fontWeight: 400,
		lineHeight: '64px',
		letterSpacing: -0.25,
	},
	displayMedium: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 45,
		fontWeight: 400,
		lineHeight: '52px',
		letterSpacing: 0,
	},
	displaySmall: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 36,
		fontWeight: 400,
		lineHeight: '44px',
		letterSpacing: 0,
	},
	headlineLarge: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 32,
		fontWeight: 400,
		lineHeight: '40px',
		letterSpacing: 0,
	},
	headlineMedium: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 28,
		fontWeight: 400,
		lineHeight: '36px',
		letterSpacing: 0,
	},
	headlineSmall: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 24,
		fontWeight: 400,
		lineHeight: '32px',
		letterSpacing: 0,
	},
	titleLarge: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 22,
		fontWeight: 400,
		lineHeight: '28px',
		letterSpacing: 0,
	},
	titleMedium: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 16,
		fontWeight: 500,
		lineHeight: '24px',
		letterSpacing: 0.15,
	},
	titleSmall: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 14,
		fontWeight: 500,
		lineHeight: '20px',
		letterSpacing: 0.1,
	},
	labelLarge: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 14,
		fontWeight: 500,
		lineHeight: '20px',
		letterSpacing: 0.1,
	},
	labelMedium: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 12,
		fontWeight: 500,
		lineHeight: '16px',
		letterSpacing: 0.5,
	},
	labelSmall: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 11,
		fontWeight: 500,
		lineHeight: '16px',
		letterSpacing: 0.5,
	},
	bodyLarge: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 16,
		fontWeight: 400,
		lineHeight: '24px',
		letterSpacing: 0.5,
	},
	bodyMedium: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 14,
		fontWeight: 400,
		lineHeight: '20px',
		letterSpacing: 0.25,
	},
	bodySmall: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 12,
		fontWeight: 400,
		lineHeight: '16px',
		letterSpacing: 0.4,
	},
})

const typographyComponent = (typographyClassName: string) =>
	function({
		className,
		render,
		...props
	}: ComponentProps<typeof Role.p>) {
		return (
			<Role.p
				{...props}
				className={styleUtils.mergeClassNames([typographyClassName, className])}
				render={render}
			/>
		)
	}

export const Typography = {
	DisplayLarge: typographyComponent(typography.displayLarge),
	DisplayMedium: typographyComponent(typography.displayMedium),
	DisplaySmall: typographyComponent(typography.displaySmall),
	HeadlineLarge: typographyComponent(typography.headlineLarge),
	HeadlineMedium: typographyComponent(typography.headlineMedium),
	HeadlineSmall: typographyComponent(typography.headlineSmall),
	TitleLarge: typographyComponent(typography.titleLarge),
	TitleMedium: typographyComponent(typography.titleMedium),
	TitleSmall: typographyComponent(typography.titleSmall),
	LabelLarge: typographyComponent(typography.labelLarge),
	LabelMedium: typographyComponent(typography.labelMedium),
	LabelSmall: typographyComponent(typography.labelSmall),
	BodyLarge: typographyComponent(typography.bodyLarge),
	BodyMedium: typographyComponent(typography.bodyMedium),
	BodySmall: typographyComponent(typography.bodySmall),
}
