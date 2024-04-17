import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent, useDeferredValue, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useRecipesSearch } from 'features/search/hooks/useRecipesSearch'
import { BottomSheet, type SheetState } from 'lib/components/BottomSheet'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { VirtualList } from 'lib/components/list/VirtualList'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { TopSearchBar } from 'lib/components/TopSearchBar'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export const Search: FunctionComponent = ({}) => {
	const { t } = useTranslation()
	const [params, setSearchParams] = useSearchParams()
	const deferredQuery = useDeferredValue(params.get('query') ?? '')
	const matches = useRecipesSearch(deferredQuery)
	const [filtersModalState, setFiltersModalState] = useState<SheetState>('close')
	const searchBarRef = useRef<HTMLInputElement>(null)

	const handleQueryChange = (query: string) => {
		setSearchParams(prev => ({
			...prev,
			query,
		}), {
			replace: true,
		})
	}

	useLayoutEffect(() => {
		if (!params.get('query')) {
			searchBarRef.current?.focus()
		}
	}, [])

	return (
		<Fragment>
			<HeaderPortal>
				<TopSearchBar
					ref={searchBarRef}
					query={params.get('query') ?? ''}
					onQueryChange={handleQueryChange}
					placeholder={t('search.placeholder')}
				/>
			</HeaderPortal>
			<Container>
				{matches.length > 0
					? (
						<VirtualList>
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
					/>
				</FabContainer>
			</ContentOverlayPortal>
			<BottomSheet
				title={t('search.filters.title')}
				state={filtersModalState}
				onStateChange={setFiltersModalState}
			/>
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
