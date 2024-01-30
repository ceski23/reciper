import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { group } from 'radash'
import { type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { RecipeStep } from 'features/recipes/components/RecipeStep'
import { type Recipe } from 'features/recipes/types'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

type StepsSectionProps = {
	steps: Recipe['instructions']
}

export const StepsSection: FunctionComponent<StepsSectionProps> = ({ steps }) => {
	const { t } = useTranslation()
	const groups = group(steps, item => item.group ?? '')

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
								step={step}
								key={index}
							/>
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
