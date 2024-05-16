import { styled } from '@macaron-css/react'
import { useTransition } from '@react-spring/web'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as scrapeRecipeRoute } from 'routes/recipes/scrape'
import { RecipeContent } from 'features/recipes/components/RecipeContent'
import { RecipeContentSkeleton } from 'features/recipes/components/RecipeContentSkeleton'
import { scrapeRecipe } from 'features/recipes/providers/scrapper'
import { useAddRecipe } from 'features/recipes/recipes'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { DIALOG_ANIMATION, SimpleDialog } from 'lib/components/Dialog'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDynamicTheme } from 'lib/hooks'
import { useApplyDynamicTheme } from 'lib/hooks/useApplyDynamicTheme'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useWakelock } from 'lib/hooks/useWakelock'
import { isValidUrl } from 'lib/utils/urls'

export const ScrapeRecipe: FunctionComponent = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const { url } = scrapeRecipeRoute.useSearch()
	const { data: recipe, status, isError } = useQuery({
		queryKey: ['scraped', url],
		queryFn: () => scrapeRecipe(url).catch(),
		retry: false,
	})
	const addRecipe = useAddRecipe()
	const transition = useTransition(isError, DIALOG_ANIMATION)

	useApplyDynamicTheme(useDynamicTheme(recipe?.color))
	useWakelock()

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				title={recipe?.name}
				onBackClick={() => history.length > 1 ? history.back() : window.close()}
			/>
			{renderProbe}
			{status !== 'success' && <RecipeContentSkeleton />}
			{status === 'success' && (
				<Fragment>
					<RecipeContent recipe={recipe} />
					<ContentOverlayPortal>
						<FabContainer>
							<FloatingActionButton
								icon="save"
								label={t('scraping.save')}
								type="button"
								variant="primary"
								size={isListScrolled ? undefined : 'expanded'}
								onClick={() =>
									addRecipe.mutate(recipe, {
										onSuccess: ({ id }) =>
											navigate({
												to: '/recipes/$id',
												params: { id },
												replace: true,
											}),
									})}
							/>
						</FabContainer>
					</ContentOverlayPortal>
				</Fragment>
			)}
			{transition((styles, open) => (
				<SimpleDialog
					title="Scraping error"
					description={t('scraping.error', { website: isValidUrl(url) ? new URL(url).host : undefined })}
					actions={[
						{
							label: t('scraping.close'),
							onClick: () => history.length > 1 ? history.back() : window.close(),
						},
					]}
					styles={styles}
					open={open}
				/>
			))}
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
