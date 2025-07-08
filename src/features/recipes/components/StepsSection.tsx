import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { type FunctionComponent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { RecipeStep } from 'features/recipes/components/RecipeStep'
import type { Recipe } from 'features/recipes/types'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

type StepsSectionProps = {
	name: string
	steps: Recipe['instructions']
}

export const StepsSection: FunctionComponent<StepsSectionProps> = ({ steps, name }) => {
	const { t } = useTranslation()
	const refs = useRef<Array<HTMLElement | null>>(Array.from(steps, () => null))
	const lastDoneSteps = useRef<Array<string>>([])
	const doneStepsStore = Ariakit.useCheckboxStore<Array<string>>({
		defaultValue: [],
		setValue: (doneSteps: Array<string>) => {
			const allSteps = steps.map((_, index) => String(index + 1))
			const nextStepNumber = Number(allSteps.find(step => !doneSteps.includes(step)))

			if (
				nextStepNumber - 1 < refs.current.length
				&& nextStepNumber - 1 > 0
				&& lastDoneSteps.current.length < doneSteps.length
			) {
				refs.current.at(nextStepNumber - 1)?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})
			}

			lastDoneSteps.current = doneSteps
		},
	})

	useEffect(() => {
		refs.current = refs.current.slice(0, steps.length)
	}, [steps.length])

	return (
		<Container>
			<Typography.TitleLarge>
				{name || t('recipes.steps.title')}
			</Typography.TitleLarge>
			<Ariakit.CheckboxProvider store={doneStepsStore}>
				<StepsList>
					{steps.map((step, index) => (
						<RecipeStep
							number={index + 1}
							step={step}
							key={step.text}
							ref={node => {
								refs.current[index] = node
							}}
						/>
					))}
				</StepsList>
			</Ariakit.CheckboxProvider>
		</Container>
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

const StepsList = styled(Ariakit.Group, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
