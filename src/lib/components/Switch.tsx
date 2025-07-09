import { styled } from '@macaron-css/react'
import { type AriaAttributes, useState } from 'react'
import { styleUtils, theme } from 'lib/styles'

type SwitchProps = AriaAttributes & {
	defaultValue?: boolean
	checked?: boolean
	onCheckedChange?: (checked: boolean) => void
	disabled?: boolean
}

export const Switch = ({
	defaultValue,
	checked,
	onCheckedChange,
	disabled,
	...props
}: SwitchProps) => {
	const [isOn, setIsOn] = useState(defaultValue ?? false)

	if (checked !== isOn && checked !== undefined) {
		setIsOn(checked ?? false)
	}

	return (
		<Track
			type="button"
			role="switch"
			disabled={disabled}
			aria-checked={isOn}
			onClick={() => {
				setIsOn(!isOn)
				onCheckedChange?.(!isOn)
			}}
			{...props}
		>
			<Handle />
		</Track>
	)
}

const Track = styled('button', {
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
			'&[aria-checked="true"]': {
				backgroundColor: theme.colors.primary,
				borderColor: theme.colors.primary,
			},
			'&:disabled': {
				borderColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
				backgroundColor: styleUtils.transparentize(theme.colors.surfaceVariant, 0.12),
				opacity: 0.38,
				cursor: 'unset',
			},
			'&:disabled[aria-checked="true"]': {
				opacity: 1,
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
				borderColor: 'transparent',
			},
		},
	},
})

const Handle = styled('span', {
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
			':not(:disabled):hover > &': {
				backgroundColor: theme.colors.onSurfaceVariant,
			},
			':not(:disabled):hover > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.08),
			},
			':not(:disabled):focus-visible > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
			':not(:disabled):active > &': {
				width: 28,
				height: 28,
				transform: 'translateX(0px)',
			},
			':not(:disabled):active > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
			'[aria-checked="true"]:not(:disabled) > &': {
				backgroundColor: theme.colors.onPrimary,
				width: 24,
				height: 24,
				transform: 'translateX(22px)',
			},
			'[aria-checked="true"]:hover:not(:disabled) > &': {
				backgroundColor: theme.colors.primaryContainer,
			},
			'[aria-checked="true"]:hover:not(:disabled) > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.08),
			},
			'[aria-checked="true"]:focus-visible:not(:disabled) > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
			},
			'[aria-checked="true"]:active:not(:disabled) > &': {
				width: 28,
				height: 28,
				transform: 'translateX(20px)',
			},
			'[aria-checked="true"]:active:not(:disabled) > &::after': {
				backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
			},
			':disabled > &': {
				backgroundColor: theme.colors.onSurface,
			},
			'[aria-checked="true"]:disabled > &': {
				backgroundColor: theme.colors.surface,
				width: 24,
				height: 24,
				transform: 'translateX(22px)',
			},
			':disabled > &::after': {
				content: 'none',
			},
		},
	},
})
