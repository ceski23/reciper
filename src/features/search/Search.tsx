import { styled } from '@macaron-css/react'
import { useNavigate } from '@tanstack/react-router'
import { sum } from 'radash'
import { Fragment, type FunctionComponent, type SetStateAction, useDeferredValue, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as v from 'valibot'
import { useRecipesSearch } from 'features/search/hooks/useRecipesSearch'
import { BottomSheet, type SheetState } from 'lib/components/BottomSheet'
import { Button } from 'lib/components/Button'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { Icon } from 'lib/components/Icon'
import { VirtualList } from 'lib/components/list/VirtualList'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { Slider } from 'lib/components/Slider'
import { TopSearchBar } from 'lib/components/TopSearchBar'
import { Typography } from 'lib/components/Typography'
import { searchRecipeRoute } from 'lib/router'
import { theme } from 'lib/styles'

export const searchParamsSchema = v.object({
	query: v.optional(v.string()),
	maxPreparationTime: v.optional(v.number([v.integer(), v.minValue(0), v.maxValue(120)])),
})

export type SearchParams = v.Output<typeof searchParamsSchema>

export const Search: FunctionComponent = ({}) => {
	const { t } = useTranslation()
	const { query, maxPreparationTime } = searchRecipeRoute.useSearch()
	const deferredParams = useDeferredValue({ query, maxPreparationTime })
	const matches = useRecipesSearch(deferredParams)
	const [filtersModalState, setFiltersModalState] = useState<SheetState>('close')
	const searchBarRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const filtersCount = sum([
		maxPreparationTime !== undefined ? 1 : 0,
	])

	const changeSearchParams = (search: SetStateAction<SearchParams>) =>
		navigate({
			search,
			viewTransition: false,
			replace: true,
		})

	useLayoutEffect(() => {
		if (!query) {
			searchBarRef.current?.focus()
		}
	}, [])

	return (
		<Fragment>
			<HeaderPortal>
				<TopSearchBar
					ref={searchBarRef}
					query={query ?? ''}
					onQueryChange={query =>
						changeSearchParams(prev => ({
							...prev,
							query,
						}))}
					placeholder={t('search.placeholder')}
				/>
			</HeaderPortal>
			<Container>
				{matches.length > 0
					? (
						<VirtualList scrollRestorationId="recipesSearchList">
							{matches.map(match => (
								<RecipeListItem
									key={match.entity.id}
									recipe={match.entity}
								/>
							))}
						</VirtualList>
					)
					: (
						<NoResultsContainer>
							<Typography.BodyLarge>
								{t('search.noResults')}
							</Typography.BodyLarge>
						</NoResultsContainer>
					)}
			</Container>
			<ContentOverlayPortal>
				<FabContainer>
					<FloatingActionButton
						icon="filters"
						label={t('search.filters.title')}
						type="button"
						variant="primary"
						onClick={() => setFiltersModalState('open')}
						badge={filtersCount > 0 ? String(filtersCount) : undefined}
					/>
				</FabContainer>
			</ContentOverlayPortal>
			<BottomSheet
				title={t('search.filters.title')}
				state={filtersModalState}
				onStateChange={setFiltersModalState}
			>
				<Filters>
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
								onValueCommit={time =>
									changeSearchParams(prev => ({
										...prev,
										maxPreparationTime: time === 0 ? undefined : time,
									}))}
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
				</Filters>
			</BottomSheet>
		</Fragment>
	)
}

const Container = styled('div', {
	base: {
		flex: 1,
		display: 'flex',
	},
})

const FabContainer = styled('div', {
	base: {
		display: 'flex',
		paddingInline: 16,
		paddingBottom: 16,
		justifyContent: 'flex-end',
	},
})

const NoResultsContainer = styled('div', {
	base: {
		height: '100%',
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.colors.onSurfaceVariant,
	},
})

const Filters = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 32,
		gap: 32,
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
		gridTemplateColumns: '100px 1fr',
		gap: 16,
		color: theme.colors.onSurfaceVariant,
	},
})

const ClearFiltersButton = styled(Button, {
	base: {
		marginTop: 16,
	},
})
