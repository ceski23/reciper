import { styled } from '@macaron-css/react'
import * as RadixSwitch from '@radix-ui/react-switch'
import { type ComponentProps, forwardRef } from 'react'
import { styleUtils, theme } from 'lib/styles'

export const Switch = forwardRef<HTMLButtonElement, ComponentProps<typeof RadixSwitch.Root>>((props, ref) => (
	<Track
		{...props}
		ref={ref}
	>
		<Handle />
	</Track>
))

const Track = styled(RadixSwitch.Root, {
	base: {
		width: 52,
		height: 32,
		borderRadius: 100,
		border: `2px solid ${theme.colors.outline}`,
		backgroundColor: theme.colors.surfaceContainerHighest,
		display: 'flex',
		margin: 4,
		alignItems: 'center',
		outline: 'none',
		transition: 'background-color .2s, border-color .2s',
		cursor: 'pointer',
		selectors: {
			'&[data-state="checked"]': {
				backgroundColor: theme.colors.primary,
				borderColor: theme.colors.primary,
			},
			'&[data-disabled]': {
				borderColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
				backgroundColor: styleUtils.transparentize(theme.colors.surfaceVariant, 0.12),
				opacity: 0.38,
				cursor: 'unset',
			},
			'&[data-disabled][data-state="checked"]': {
				opacity: 1,
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
				borderColor: 'transparent',
			},
		},
	},
})

const Handle = styled(RadixSwitch.Thumb, {
	base: {
		width: 16,
		height: 16,
		borderRadius: '50%',
		backgroundColor: theme.colors.outline,
		display: 'block',
		transition: 'width .2s, height .2s, margin-inline .2s, background-color .2s, transform .2s',
		position: 'relative',
		transform: 'translateX(6px)',
		'::after': {
			content: '',
			display: 'block',
			width: 40,
			height: 40,
			borderRadius: '50%',
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			transition: 'width .2s, height .2s, margin-inline .2s, background-color .2s',
		},
		selectors: {
			':not([data-disabled]):hover > &': {
				backgroundColor: theme.colors.onSurfaceVariant,
			},
			':not([data-disabled]):hover > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.08),
			},
			':not([data-disabled]):focus-visible > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
			':not([data-disabled]):active > &': {
				width: 28,
				height: 28,
				transform: 'translateX(0px)',
			},
			':not([data-disabled]):active > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
			'[data-state="checked"]:not([data-disabled]) > &': {
				backgroundColor: theme.colors.onPrimary,
				width: 24,
				height: 24,
				transform: 'translateX(22px)',
			},
			'[data-state="checked"]:hover:not([data-disabled]) > &': {
				backgroundColor: theme.colors.primaryContainer,
			},
			'[data-state="checked"]:hover:not([data-disabled]) > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.08),
			},
			'[data-state="checked"]:focus-visible:not([data-disabled]) > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
			},
			'[data-state="checked"]:active:not([data-disabled]) > &': {
				width: 28,
				height: 28,
				transform: 'translateX(20px)',
			},
			'[data-state="checked"]:active:not([data-disabled]) > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
			},
			'[data-disabled] > &': {
				backgroundColor: theme.colors.onSurface,
			},
			'[data-state="checked"][data-disabled] > &': {
				backgroundColor: theme.colors.surface,
				width: 24,
				height: 24,
				transform: 'translateX(22px)',
			},
			'[data-disabled] > &::after': {
				content: 'none',
			},
		},
	},
})
