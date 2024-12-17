import * as Ariakit from '@ariakit/react'
import { Icon } from '@components/Icon'
import { Typography } from '@components/Typography'
import { useRipples } from '@hooks/useRipples'
import { styled } from '@macaron-css/react'
import { theme } from '@styles/theme'
import mergeProps from 'merge-props'
import { type ComponentProps, forwardRef } from 'react'
import { match, P } from 'ts-pattern'
import { type SvgSpriteIconName } from 'virtual:svg-sprite'
import { styleUtils } from 'lib/styles'

type SegmentProps = ComponentProps<typeof SegmentButton> & {
	label: string
	icon?: SvgSpriteIconName
	hiddenLabel?: boolean
}

const Segment = forwardRef<HTMLButtonElement, SegmentProps>(({
	label,
	icon,
	disabled,
	hiddenLabel,
	...props
}, ref) => {
	const { eventHandlers, renderRipples } = useRipples()
	const isSelected = props['aria-checked'] === true

	return (
		<SegmentButton
			{...mergeProps(props, eventHandlers)}
			selected={isSelected}
			disabled={disabled}
			aria-label={hiddenLabel ? label : undefined}
			ref={ref}
		>
			{!disabled && renderRipples}
			{isSelected && (
				<Icon
					name="check"
					size={18}
				/>
			)}
			{match([isSelected, hiddenLabel, icon])
				// Selected, label + icon
				.with([true, false, P.nonNullable], () => null)
				// Selected, label only
				.with([true, false, undefined], () => null)
				// Selected, icon only
				.with([true, true, P.nonNullable], ([, , icon]) => (
					<Icon
						name={icon}
						size={18}
					/>
				))
				// Not selected, with icon
				.with([false, P._, P.nonNullable], ([, , icon]) => (
					<Icon
						name={icon}
						size={18}
					/>
				))
				.otherwise(() => null)}
			{!hiddenLabel && <Typography.LabelLarge>{label}</Typography.LabelLarge>}
		</SegmentButton>
	)
})

const Root = styled(Ariakit.Role, {
	base: {
		display: 'flex',
	},
})

const SegmentButton = styled(Ariakit.Button, {
	base: {
		height: 40,
		minWidth: 104,
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: `1px solid ${theme.colors.outline}`,
		paddingInline: 12,
		paddingBlock: 10,
		color: theme.colors.onSurface,
		backgroundColor: 'transparent',
		cursor: 'pointer',
		gap: 8,
		marginLeft: -1,
		transition: 'background-color .2s, color .2s',
		':hover': {
			backgroundColor: styleUtils.transparentize(theme.colors.onSecondaryContainer, 0.08),
		},
		':focus-visible': {
			outline: 'none',
			backgroundColor: styleUtils.transparentize(theme.colors.onSecondaryContainer, 0.12),
		},
		':active': {
			backgroundColor: styleUtils.transparentize(theme.colors.onSecondaryContainer, 0.12),
		},
		':disabled': {
			color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
			backgroundColor: 'transparent',
			borderColor: styleUtils.transparentize(theme.colors.outline, 0.12),
			cursor: 'unset',
		},
		selectors: {
			'&:first-of-type': {
				borderRadius: '100px 0 0 100px',
				marginLeft: 0,
			},
			'&:last-of-type': {
				borderRadius: '0 100px 100px 0',
			},
		},
	},
	variants: {
		selected: {
			true: {
				backgroundColor: theme.colors.secondaryContainer,
				color: theme.colors.onSecondaryContainer,
				':hover': {
					backgroundColor: theme.colors.secondaryContainer,
				},
				':focus-visible': {
					backgroundColor: theme.colors.secondaryContainer,
				},
				':active': {
					backgroundColor: theme.colors.secondaryContainer,
				},
			},
		},
		density: {
			'0': {},
			'-1': { height: 36 },
			'-2': { height: 32 },
			'-3': { height: 28 },
		},
	},
	defaultVariants: {
		selected: false,
	},
})

export const SegmentedButton = {
	Root,
	Segment,
}
