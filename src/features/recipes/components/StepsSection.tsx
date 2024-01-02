import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { groupBy } from 'ramda'
import { type FunctionComponent } from 'react'
import { RecipeStep } from 'features/recipes/components/RecipeStep'
import { type Recipe } from 'features/recipes/samples'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

type StepsSectionProps = {
	steps: Recipe['instructions']
}

export const StepsSection: FunctionComponent<StepsSectionProps> = ({ steps }) => {
	const groups = groupBy(item => item.group ?? '', steps)

	return Object.entries(groups).map(([name, steps]) =>
		steps
			? (
				<Container key={name}>
					<Typography.TitleLarge>
						{name || 'Steps'}
					</Typography.TitleLarge>
					<StepsList type="multiple">
						{steps.map((step, index) => (
							<RecipeStep
								number={index + 1}
								key={index}
							>
								<Typography.BodyMedium>
									{step.text}
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
