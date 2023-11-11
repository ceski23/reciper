/* eslint-disable react/function-component-definition */
import { style } from '@macaron-css/core'
import { Slot } from '@radix-ui/react-slot'
import { type ComponentPropsWithoutRef, type FunctionComponent } from 'react'
import { styleUtils } from 'lib/styles'

type TypographyParagraphProps = {
	asChild?: undefined
} & ComponentPropsWithoutRef<'p'>

type TypographyAsChildProps = {
	asChild: true
	className?: string
}

const typographyComponent = (typographyClassName: string): FunctionComponent<TypographyParagraphProps | TypographyAsChildProps> =>
({
	className,
	asChild,
	...props
}) => {
	const Component = asChild ? Slot : 'p'

	return (
		<Component
			className={styleUtils.mergeClassNames([typographyClassName, className])}
			{...props}
		/>
	)
}

export const displayLarge = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 57,
	fontWeight: 400,
	lineHeight: '64px',
	letterSpacing: -0.25,
})

export const displayMedium = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 45,
	fontWeight: 400,
	lineHeight: '52px',
	letterSpacing: 0,
})

export const displaySmall = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 36,
	fontWeight: 400,
	lineHeight: '44px',
	letterSpacing: 0,
})

export const headlineLarge = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 32,
	fontWeight: 400,
	lineHeight: '40px',
	letterSpacing: 0,
})

export const headlineMedium = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 28,
	fontWeight: 400,
	lineHeight: '36px',
	letterSpacing: 0,
})

export const headlineSmall = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 24,
	fontWeight: 400,
	lineHeight: '32px',
	letterSpacing: 0,
})
export const titleLarge = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 22,
	fontWeight: 400,
	lineHeight: '28px',
	letterSpacing: 0,
})

export const titleMedium = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 16,
	fontWeight: 500,
	lineHeight: '24px',
	letterSpacing: 0.15,
})

export const titleSmall = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 14,
	fontWeight: 500,
	lineHeight: '20px',
	letterSpacing: 0.1,
})

export const labelLarge = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 14,
	fontWeight: 500,
	lineHeight: '20px',
	letterSpacing: 0.1,
})

export const labelMedium = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 12,
	fontWeight: 500,
	lineHeight: '16px',
	letterSpacing: 0.5,
})

export const labelSmall = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 11,
	fontWeight: 500,
	lineHeight: '16px',
	letterSpacing: 0.5,
})

export const bodyLarge = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 16,
	fontWeight: 400,
	lineHeight: '24px',
	letterSpacing: 0.5,
})

export const bodyMedium = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 14,
	fontWeight: 400,
	lineHeight: '20px',
	letterSpacing: 0.25,
})

export const bodySmall = style({
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSize: 12,
	fontWeight: 400,
	lineHeight: '16px',
	letterSpacing: 0.4,
})

export const Typography = {
	DisplayLarge: typographyComponent(displayLarge),
	DisplayMedium: typographyComponent(displayMedium),
	DisplaySmall: typographyComponent(displaySmall),
	HeadlineLarge: typographyComponent(headlineLarge),
	HeadlineMedium: typographyComponent(headlineMedium),
	HeadlineSmall: typographyComponent(headlineSmall),
	TitleLarge: typographyComponent(titleLarge),
	TitleMedium: typographyComponent(titleMedium),
	TitleSmall: typographyComponent(titleSmall),
	LabelLarge: typographyComponent(labelLarge),
	LabelMedium: typographyComponent(labelMedium),
	LabelSmall: typographyComponent(labelSmall),
	BodyLarge: typographyComponent(bodyLarge),
	BodyMedium: typographyComponent(bodyMedium),
	BodySmall: typographyComponent(bodySmall),
}
