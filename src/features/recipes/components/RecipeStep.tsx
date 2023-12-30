import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type FunctionComponent, type ReactNode } from 'react'
import { Typography } from 'lib/components/Typography'
import { useRipples } from 'lib/hooks/useRipples'
import { styleUtils, theme } from 'lib/styles'

type RecipeStepProps = {
	number: number
	children: ReactNode
}

export const RecipeStep: FunctionComponent<RecipeStepProps> = ({ number, children }) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<Item
			value={String(number)}
			{...eventHandlers}
		>
			{renderRipples}
			<Number>
				Step {number}
			</Number>
			{children}
		</Item>
	)
}

const Item = styled(ToggleGroup.Item, {
	base: {
		position: 'relative',
		border: 'none',
		textAlign: 'unset',
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		color: theme.colors.onSurface,
		borderRadius: 12,
		backgroundColor: theme.colors.surfaceContainerHighest,
		padding: 16,
		cursor: 'pointer',
		transition: 'background-color .2s, opacity .2s',
		selectors: {
			'&[data-state="on"]': {
				opacity: 0.5,
				textDecoration: 'line-through',
			},
		},
		':hover': {
			backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerHighest, theme.colors.primary, 0.08),
		},
		':focus-visible': {
			backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerHighest, theme.colors.primary, 0.12),
		},
		':active': {
			backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerHighest, theme.colors.primary, 0.12),
		},
	},
})

const Number = styled(Typography.LabelMedium, {
	base: {
		color: theme.colors.primary,
	},
})
