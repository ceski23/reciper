import { styled } from '@macaron-css/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as scrapeRecipeRoute } from 'routes/recipes/scrape'
import { match, P } from 'ts-pattern'
import * as v from 'valibot'
import { useNotifications } from 'features/notifications'
import { RecipeContent } from 'features/recipes/components/RecipeContent'
import { RecipeContentSkeleton } from 'features/recipes/components/RecipeContentSkeleton'
import { ScrappingErrorDialog } from 'features/recipes/components/ScrappingErrorDialog'
import { scrapeRecipe } from 'features/recipes/providers/scrapper'
import { useAddRecipe, useEditRecipe } from 'features/recipes/recipes'
import { type Recipe, type recipeScheme } from 'features/recipes/types'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDynamicTheme } from 'lib/hooks'
import { useApplyDynamicTheme } from 'lib/hooks/useApplyDynamicTheme'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useWakelock } from 'lib/hooks/useWakelock'

export const ScrapeRecipe: FunctionComponent = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const { url, id } = scrapeRecipeRoute.useSearch()
	const query = useQuery({
		queryKey: ['scraped', url],
		queryFn: () => scrapeRecipe(url).catch(),
		retry: false,
	})
	const addRecipe = useAddRecipe()
	const editRecipe = useEditRecipe()
	const { notify } = useNotifications()

	useApplyDynamicTheme(useDynamicTheme(query.data?.color))
	useWakelock()

	const handleRecipeSave = (recipe: Recipe) => {
		const mutation = id === undefined ? addRecipe : editRecipe

		mutation.mutate(recipe, {
			onSuccess: savedRecipe => {
				if (id !== undefined) {
					notify(t('editRecipe.success'))
				}
				navigate({ to: '/recipes/$id', params: { id: savedRecipe.id }, replace: true })
			},
		})
	}

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				title={query.data?.name}
				onBackClick={() => history.length > 1 ? history.back() : window.close()}
			/>
			{renderProbe}
			{match(query)
				.with(P.not({ status: 'success' }), () => <RecipeContentSkeleton />)
				.with({ status: 'success' }, ({ data }) => (
					<Fragment>
						<RecipeContent recipe={data} />
						<ContentOverlayPortal>
							<FabContainer>
								<FloatingActionButton
									icon="save"
									label={t('scraping.save')}
									type="button"
									variant="primary"
									size={isListScrolled ? undefined : 'expanded'}
									onClick={() => handleRecipeSave(data)}
								/>
							</FabContainer>
						</ContentOverlayPortal>
					</Fragment>
				))
				.exhaustive()}
			<ScrappingErrorDialog
				open={query.isError}
				onClose={() => history.length > 1 ? history.back() : window.close()}
				url={url}
				error={v.isValiError<typeof recipeScheme>(query.error) ? query.error : undefined}
			/>
		</Fragment>
	)
}

const FabContainer = styled('div', {
	base: {
		display: 'flex',
		paddingInline: 16,
		paddingBottom: 16,
		justifyContent: 'flex-end',
	},
})
