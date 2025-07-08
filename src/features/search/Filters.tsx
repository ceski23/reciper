import { styled } from '@macaron-css/react'
import { mq } from '@styles/utils'
import { type FunctionComponent, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as searchRecipeRoute } from 'routes/search'
import { IngredientsFilter } from 'features/search/IngredientsFilter'
import { type SearchParams } from 'features/search/Search'
import { BottomSheet, type SheetState } from 'lib/components/BottomSheet'
import { Button } from 'lib/components/Button'
import { Icon } from 'lib/components/Icon'
import { Slider } from 'lib/components/Slider'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

type FilterProps = {
	state: SheetState
	onStateChange: (state: SheetState) => void
	filtersCount: number
}

export const Filters: FunctionComponent<FilterProps> = ({ state, onStateChange, filtersCount }) => {
	const { t } = useTranslation()
	const { maxPreparationTime, ingredients = [] } = searchRecipeRoute.useSearch()
	const navigate = searchRecipeRoute.useNavigate()
	const changeSearchParams = (search: SetStateAction<SearchParams>) =>
		navigate({
			search,
			viewTransition: false,
			replace: true,
		})

	return (
		<FiltersContainer
			title={t('search.filters.title')}
			state={state}
			onStateChange={onStateChange}
		>
			<Sections>
				<FilterSection>
					<FilterSectionHeader>
						<FilterIcon
							name="cookie"
							size={24}
						/>
						<Typography.TitleMedium>
							{t('search.filters.requiredIngredients.title')}
						</Typography.TitleMedium>
					</FilterSectionHeader>
					<IngredientsFilter
						selectedIngredients={ingredients}
						onSelectedIngredientsChange={ingredients => changeSearchParams(prev => ({ ...prev, ingredients }))}
					/>
				</FilterSection>
				<FilterSection>
					<FilterSectionHeader>
						<FilterIcon
							name="timer"
							size={24}
						/>
						<Typography.TitleMedium>{t('search.filters.preparationTime.title')}</Typography.TitleMedium>
					</FilterSectionHeader>
					<TimeFilter onPointerDown={event => event.stopPropagation()}>
						<Typography.LabelMedium>
							{maxPreparationTime === undefined
								? t('search.filters.preparationTime.noLimit')
								: t('search.filters.preparationTime.upTo', { count: maxPreparationTime })}
						</Typography.LabelMedium>
						<Slider
							label={t('search.filters.preparationTime.title')}
							min={0}
							max={120}
							step={5}
							value={maxPreparationTime ?? 0}
							onValueCommit={time => {
								if (time === maxPreparationTime) return

								changeSearchParams(prev => ({
									...prev,
									maxPreparationTime: time === 0 ? undefined : time,
								}))
							}}
						/>
					</TimeFilter>
				</FilterSection>
				{filtersCount > 0 && (
					<ClearFiltersButton
						variant="outlined"
						leftIcon="close"
						onClick={() => changeSearchParams(({ query }) => ({ query }))}
					>
						{t('search.filters.clear')}
					</ClearFiltersButton>
				)}
			</Sections>
		</FiltersContainer>
	)
}

const Sections = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 32,
		gap: 32,
		'@media': {
			[mq.atLeast('md')]: {
				marginBottom: 100,
			},
		},
	},
})

const FilterSection = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 24,
	},
})

const FilterSectionHeader = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		color: theme.colors.onSurface,
	},
})

const FilterIcon = styled(Icon, {
	base: {
		color: theme.colors.primary,
	},
})

const TimeFilter = styled('div', {
	base: {
		display: 'grid',
		gridTemplateColumns: '120px 1fr',
		gap: 16,
		color: theme.colors.onSurfaceVariant,
	},
})

const ClearFiltersButton = styled(Button, {
	base: {
		marginTop: 16,
	},
})

const FiltersContainer = styled(BottomSheet, {
	base: {
		'@media': {
			[mq.atLeast('md')]: {
				width: '100%',
				maxWidth: 700,
			},
		},
	},
})
