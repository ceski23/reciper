import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { groupBy } from 'ramda'
import { type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { RecipeStep } from 'features/recipes/components/RecipeStep'
import { TemperatureSegment } from 'features/recipes/components/TemperatureSegment'
import { type Recipe } from 'features/recipes/types'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'
import { TEMPERATURE_PATTERN } from 'lib/utils/temperature'
import { segmentizeText } from 'lib/utils/text'

type StepsSectionProps = {
	steps: Recipe['instructions']
}

export const StepsSection: FunctionComponent<StepsSectionProps> = ({ steps }) => {
	const { t } = useTranslation()
	const groups = groupBy(item => item.group ?? '', steps)

	return Object.entries(groups).map(([name, steps]) =>
		steps
			? (
				<Container key={name}>
					<Typography.TitleLarge>
						{name || t('recipes.steps.title')}
					</Typography.TitleLarge>
					<StepsList type="multiple">
						{steps.map((step, index) => (
							<RecipeStep
								number={index + 1}
								key={index}
							>
								<Typography.BodyMedium>
									{segmentizeText(step.text, TEMPERATURE_PATTERN, (match, index) => (
										<TemperatureSegment
											match={match}
											key={index}
										/>
									))}
								</Typography.BodyMedium>
							</RecipeStep>
						))}
					</StepsList>
				</Container>
			)
			: undefined
	)
}

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		color: theme.colors.onBackground,
	},
})

const StepsList = styled(ToggleGroup.Root, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
