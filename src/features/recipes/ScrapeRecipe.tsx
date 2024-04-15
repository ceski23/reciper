import { styled } from '@macaron-css/react'
import { useTransition } from '@react-spring/web'
import { useQuery } from '@tanstack/react-query'
import { Fragment, type FunctionComponent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTypedSearchParams } from 'react-router-typesafe-routes/dom'
import { RecipeContent } from 'features/recipes/components/RecipeContent'
import { RecipeContentSkeleton } from 'features/recipes/components/RecipeContentSkeleton'
import { scrapeRecipe } from 'features/recipes/providers/scrapper'
import { useAddRecipe } from 'features/recipes/recipes'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { DIALOG_ANIMATION, SimpleDialog } from 'lib/components/Dialog'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { MainContent } from 'lib/components/Layout'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDynamicTheme } from 'lib/hooks'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useWakelock } from 'lib/hooks/useWakelock'
import { PATHS } from 'lib/routing/paths'
import { isValidUrl } from 'lib/utils/urls'

export const ScrapeRecipe: FunctionComponent = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const [{ url }] = useTypedSearchParams(PATHS.RECIPES.SCRAPE)
	const { data: recipe, status, isError } = useQuery({
		queryKey: ['scraped', url],
		queryFn: () => scrapeRecipe(url).catch(),
		retry: false,
	})
	const style = useDynamicTheme(recipe?.color)
	const addRecipe = useAddRecipe()
	const transition = useTransition(isError, DIALOG_ANIMATION)
	const location = useLocation()
	const contentRef = useRef<HTMLElement>(null!)

	useWakelock()

	return (
		<MainContent ref={contentRef}>
			<TopAppBar
				configuration="large"
				title={recipe?.name}
				container={contentRef}
				style={style}
			/>
			{renderProbe}
			{status !== 'success' && <RecipeContentSkeleton />}
			{status === 'success' && (
				<Fragment>
					<RecipeContent
						recipe={recipe}
						style={style}
					/>
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
											navigate(PATHS.RECIPES.RECIPE.buildPath({ id }), {
												unstable_viewTransition: true,
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
							onClick: () => {
								if (location.key === 'default') return window.close()
								navigate(-1)
							},
						},
					]}
					styles={styles}
					open={open}
				/>
			))}
		</MainContent>
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
