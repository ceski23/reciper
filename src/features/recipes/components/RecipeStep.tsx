import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TemperatureSegment } from 'features/recipes/components/TemperatureSegment'
import type { Recipe } from 'features/recipes/types'
import { Typography } from 'lib/components/Typography'
import { useRipples } from 'lib/hooks/useRipples'
import { styleUtils, theme } from 'lib/styles'
import { TEMPERATURE_PATTERN } from 'lib/utils/temperature'
import { segmentizeText } from 'lib/utils/text'

type RecipeStepProps = {
	number: number
	step: Recipe['instructions'][number]
}

export const RecipeStep = forwardRef<HTMLButtonElement, RecipeStepProps>(({ number, step }, ref) => {
	const { t } = useTranslation()
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<Item
			ref={ref}
			value={String(number)}
			{...eventHandlers}
		>
			{renderRipples}
			<StepNumber>
				{t('recipes.steps.step', { step: number })}
			</StepNumber>
			<Typography.BodyMedium>
				{segmentizeText(step.text, TEMPERATURE_PATTERN, (match, index) => (
					<TemperatureSegment
						match={match}
						key={index}
					/>
				))}
			</Typography.BodyMedium>
			{step.image && (
				<StepImage
					src={step.image}
					alt={step.text}
				/>
			)}
		</Item>
	)
})

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

const StepNumber = styled(Typography.LabelMedium, {
	base: {
		color: theme.colors.primary,
	},
})

const StepImage = styled('img', {
	base: {
		display: 'block',
		width: '100%',
		borderRadius: 8,
		marginTop: 8,
	},
})
