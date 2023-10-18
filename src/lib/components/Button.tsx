import { styled } from '@macaron-css/react'
import type { ComponentProps, FunctionComponent } from 'react'
import React from 'react'
import { styleUtils, theme } from 'lib/styles'

type ButtonProps = {
	leftIcon?: React.ReactNode
}

export const Button: FunctionComponent<ComponentProps<typeof ButtonBase> & ButtonProps> = ({
	children,
	leftIcon,
	...props
}) => {
	return (
		<ButtonBase {...props}>
			{leftIcon}
			{children}
		</ButtonBase>
	)
}

const ButtonBase = styled('button', {
	base: {
		height: 40,
		borderRadius: 100,
		padding: '10px 24px',
		fontWeight: 500,
		fontSize: 14,
		lineHeight: '20px',
		letterSpacing: 0.1,
		transition: 'background-color .2s, box-shadow .2s',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		':focus-visible': {
			outline: 'none',
		},
	},
	variants: {
		variant: {
			elevated: {
				color: theme.colors.primary,
				backgroundColor: theme.colors.surfaceContainerLow,
				border: 'none',
				boxShadow: `0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);`,
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerLow, theme.colors.primary, 0.08),
					boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerLow, theme.colors.primary, 0.12),
					boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
				},
				':active': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerLow, theme.colors.primary, 0.12),
					boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
				},
				':disabled': {
					color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
					boxShadow: 'none',
					cursor: 'unset',
				},
			},
			tonal: {
				color: theme.colors.onSecondaryContainer,
				backgroundColor: theme.colors.secondaryContainer,
				border: 'none',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
					boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					boxShadow: 'none',
				},
				':active': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					boxShadow: 'none',
				},
				':disabled': {
					color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
					boxShadow: 'none',
					cursor: 'unset',
				},
			},
			filled: {
				backgroundColor: theme.colors.primary,
				border: 'none',
				color: theme.colors.onPrimary,
				boxShadow: '0px 0px 0px transparent',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.primary, theme.colors.onPrimary, 0.08),
					boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.primary, theme.colors.onPrimary, 0.12),
				},
				':active': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.primary, theme.colors.onPrimary, 0.12),
				},
				':disabled': {
					color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
					boxShadow: 'none',
					cursor: 'unset',
				},
			},
			outlined: {
				color: theme.colors.primary,
				backgroundColor: 'transparent',
				border: `1px solid ${theme.colors.outline}`,
				':hover': {
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.08),
				},
				':focus-visible': {
					border: `1px solid ${theme.colors.primary}`,
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
				},
				':active': {
					border: `1px solid ${theme.colors.outline}`,
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
				},
				':disabled': {
					color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					backgroundColor: 'transparent',
					border: `1px solid ${styleUtils.transparentize(theme.colors.onSurface, 0.12)}`,
					cursor: 'unset',
				},
			},
			text: {
				color: theme.colors.primary,
				padding: '10px 12px',
				backgroundColor: 'transparent',
				border: 'none',
				':hover': {
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
				},
				':active': {
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
				},
				':disabled': {
					color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					backgroundColor: 'transparent',
					cursor: 'unset',
				},
			},
		},
	},
	defaultVariants: {
		variant: 'tonal',
	},
})
