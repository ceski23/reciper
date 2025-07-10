import { useIsMobile } from '@hooks/useIsMobile'
import { styled } from '@macaron-css/react'
import { mq } from '@styles/utils'
import { sum } from 'es-toolkit'
import { Fragment, type FunctionComponent, type SetStateAction, useDeferredValue, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as searchRecipeRoute } from 'routes/search'
import * as v from 'valibot'
import { Filters } from 'features/search/Filters'
import { useRecipesSearch } from 'features/search/hooks/useRecipesSearch'
import { TopSearchBar } from 'features/search/TopSearchBar'
import { type SheetState } from 'lib/components/BottomSheet'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { List } from 'lib/components/list'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export const searchParamsSchema = v.object({
	query: v.optional(v.string()),
	maxPreparationTime: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(120))),
	ingredients: v.optional(v.array(v.string())),
})

export type SearchParams = v.InferOutput<typeof searchParamsSchema>

export const Search: FunctionComponent = () => {
	const { t } = useTranslation()
	const { query, maxPreparationTime, ingredients = [] } = searchRecipeRoute.useSearch()
	const deferredParams = useDeferredValue({ query, maxPreparationTime, ingredients })
	const matches = useRecipesSearch(deferredParams)
	const [filtersModalState, setFiltersModalState] = useState<SheetState>('close')
	const [isListScrolled, setIsListScrolled] = useState(false)
	const searchBarRef = useRef<HTMLInputElement>(null)
	const navigate = searchRecipeRoute.useNavigate()
	const isMobile = useIsMobile()
	const filtersCount = sum([
		maxPreparationTime !== undefined ? 1 : 0,
		ingredients.length > 0 ? 1 : 0,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					onBackClick={() => history.length > 1 ? history.back() : window.close()}
				/>
			</HeaderPortal>
			<Container>
				{matches.length > 0
					? (
						<RecipesList
							virtual
							scrollRestorationId="recipesSearchList"
							onIsScrolledChange={setIsListScrolled}
						>
							{matches.map(match => (
								<RecipeListItem
									key={match.entity.id}
									recipe={match.entity}
								/>
							))}
						</RecipesList>
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
						size={isMobile ? (isListScrolled ? undefined : 'expanded') : 'expanded'}
					/>
				</FabContainer>
			</ContentOverlayPortal>
			<Filters
				state={filtersModalState}
				onStateChange={setFiltersModalState}
				filtersCount={filtersCount}
			/>
		</Fragment>
	)
}

const Container = styled('div', {
	base: {
		flex: 1,
		display: 'flex',
		'@media': {
			[mq.atLeast('md')]: {
				paddingBlock: 16,
			},
		},
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

const RecipesList = styled(List.Root, {
	base: {
		flex: 'unset',
		'@media': {
			[mq.atLeast('md')]: {
				backgroundColor: theme.colors.surfaceContainerLow,
				borderRadius: 12,
				overflow: 'hidden',
				maxWidth: '800px',
			},
		},
	},
})
