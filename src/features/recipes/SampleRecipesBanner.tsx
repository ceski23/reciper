import { Banner } from '@components/Banner'
import { styled } from '@macaron-css/react'
import { animated, useTransition } from '@react-spring/web'
import { useMeasure } from '@uidotdev/usehooks'
import { type FunctionComponent, useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type SampleRecipesBannerProps = {
	onAddClick: () => void
	showDelay?: number
	show: boolean
}

export const SampleRecipesBanner: FunctionComponent<SampleRecipesBannerProps> = ({ onAddClick, showDelay = 2000, show }) => {
	const { t } = useTranslation()
	const [isVisible, setIsVisible] = useState(true)
	const [ref, { height }] = useMeasure()
	const transitions = useTransition(isVisible, {
		from: { opacity: 0, height: 0, y: -50 },
		enter: { opacity: 1, height, y: 0 },
		leave: { opacity: 0, height: 0, y: -50 },
	})

	// Allow to measure the height of the banner on first render
	useLayoutEffect(() => {
		setIsVisible(false)
	}, [])

	useEffect(() => {
		if (show) {
			const id = setTimeout(() => setIsVisible(true), showDelay)

			return () => clearTimeout(id)
		}

		setIsVisible(false)
	}, [show, showDelay])

	return transitions((styles, show) =>
		show && (
			(
				<Container style={styles}>
					<Banner
						ref={ref}
						icon="recipes"
						content={t('recipes.sampleRecipes.text')}
						actions={[
							{
								label: t('recipes.sampleRecipes.dismiss'),
								onClick: () => setIsVisible(false),
							},
							{
								label: t('recipes.sampleRecipes.add'),
								onClick: () => {
									setIsVisible(false)
									onAddClick()
								},
							},
						]}
					/>
				</Container>
			)
		)
	)
}

const Container = styled(animated.div, {
	base: {
		overflow: 'hidden',
	},
})
