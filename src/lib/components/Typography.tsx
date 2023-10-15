import { styled } from '@macaron-css/react'

const DisplayLarge = styled('h1', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 57,
		fontWeight: 400,
		lineHeight: '64px',
		letterSpacing: -0.25,
	},
})

const DisplayMedium = styled('h2', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 45,
		fontWeight: 400,
		lineHeight: '52px',
		letterSpacing: 0,
	},
})

const DisplaySmall = styled('h3', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 36,
		fontWeight: 400,
		lineHeight: '44px',
		letterSpacing: 0,
	},
})

const HeadlineLarge = styled('h4', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 32,
		fontWeight: 400,
		lineHeight: '40px',
		letterSpacing: 0,
	},
})

const HeadlineMedium = styled('h5', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 28,
		fontWeight: 400,
		lineHeight: '36px',
		letterSpacing: 0,
	},
})

const HeadlineSmall = styled('h6', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 24,
		fontWeight: 400,
		lineHeight: '32px',
		letterSpacing: 0,
	},
})

const TitleLarge = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 22,
		fontWeight: 400,
		lineHeight: '28px',
		letterSpacing: 0,
	},
})

const TitleMedium = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 16,
		fontWeight: 500,
		lineHeight: '24px',
		letterSpacing: 0.15,
	},
})

const TitleSmall = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 14,
		fontWeight: 500,
		lineHeight: '20px',
		letterSpacing: 0.1,
	},
})

const LabelLarge = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 14,
		fontWeight: 500,
		lineHeight: '20px',
		letterSpacing: 0.1,
	},
})

const LabelMedium = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 12,
		fontWeight: 500,
		lineHeight: '16px',
		letterSpacing: 0.5,
	},
})

const LabelSmall = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 11,
		fontWeight: 500,
		lineHeight: '16px',
		letterSpacing: 0.5,
	},
})

const BodyLarge = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 16,
		fontWeight: 400,
		lineHeight: '24px',
		letterSpacing: 0.5,
	},
})

const BodyMedium = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 14,
		fontWeight: 400,
		lineHeight: '20px',
		letterSpacing: 0.25,
	},
})

const BodySmall = styled('p', {
	base: {
		fontFamily: '"Roboto Flex Variable", sans-serif',
		fontSize: 12,
		fontWeight: 400,
		lineHeight: '16px',
		letterSpacing: 0.4,
	},
})

export const Typography = {
	DisplayLarge,
	DisplayMedium,
	DisplaySmall,
	HeadlineLarge,
	HeadlineMedium,
	HeadlineSmall,
	TitleLarge,
	TitleMedium,
	TitleSmall,
	LabelLarge,
	LabelMedium,
	LabelSmall,
	BodyLarge,
	BodyMedium,
	BodySmall,
}
