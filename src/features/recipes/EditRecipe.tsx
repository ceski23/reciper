import { styled } from '@macaron-css/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as editRecipeRoute } from 'routes/recipes_/$id.edit'
import * as v from 'valibot'
import { useNotifications } from 'features/notifications'
import { RecipeForm } from 'features/recipes/form/RecipeForm'
import type { RecipeFormValues } from 'features/recipes/form/scheme'
import { mapFormValuesToRecipe, mapRecipeToFormValues } from 'features/recipes/form/utils'
import { recipeQuery, useEditRecipe } from 'features/recipes/recipes'
import { type Recipe, recipeScheme } from 'features/recipes/types'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'

export const EditRecipe: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isContentScrolled, setIsContentScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsContentScrolled)
	const { notify } = useNotifications()
	const formId = useId()
	const editRecipe = useEditRecipe()
	const navigate = useNavigate()
	const { id } = editRecipeRoute.useParams()
	const { data: recipe } = useQuery(recipeQuery(id))

	const onSubmit = async (values: RecipeFormValues, originalRecipe: Recipe) => {
		try {
			const editedRecipe = v.parse(
				recipeScheme,
				{
					...originalRecipe,
					...mapFormValuesToRecipe(values),
				} satisfies Recipe,
			)

			const { id } = await editRecipe.mutateAsync(editedRecipe)
			navigate({ to: '/recipes/$id', params: { id } })
			notify(t('editRecipe.success'))
		} catch (error) {
			notify(t('newRecipe.invalid'))
		}
	}

	return (
		<Fragment>
			{renderProbe}
			<TopAppBar
				configuration="small"
				title={t('editRecipe.title')}
				onBackClick={() => history.length > 1 ? history.back() : window.close()}
			/>
			{recipe && (
				<Fragment>
					<RecipeForm
						id={formId}
						onSubmit={values => onSubmit(values, recipe)}
						initialValues={mapRecipeToFormValues(recipe)}
					/>
					<ContentOverlayPortal>
						<FabContainer>
							<FloatingActionButton
								icon="save"
								label={t('editRecipe.save')}
								type="submit"
								variant="primary"
								size={isContentScrolled ? undefined : 'expanded'}
								form={formId}
							/>
						</FabContainer>
					</ContentOverlayPortal>
				</Fragment>
			)}
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
