import { styled } from '@macaron-css/react'
import { useNavigate } from '@tanstack/react-router'
import { nanoid } from 'nanoid'
import { Fragment, type FunctionComponent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as v from 'valibot'
import { useNotifications } from 'features/notifications'
import { RecipeForm } from 'features/recipes/form/RecipeForm'
import type { RecipeFormValues } from 'features/recipes/form/scheme'
import { mapFormValuesToRecipe } from 'features/recipes/form/utils'
import { useAddRecipe } from 'features/recipes/recipes'
import { type Recipe, recipeScheme } from 'features/recipes/types'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'

export const NewRecipe: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isContentScrolled, setIsContentScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsContentScrolled)
	const { notify } = useNotifications()
	const formId = useId()
	const addRecipe = useAddRecipe()
	const navigate = useNavigate()

	const onSubmit = (values: RecipeFormValues) => {
		try {
			const recipe = v.parse(
				recipeScheme,
				{
					...mapFormValuesToRecipe(values),
					id: nanoid(),
					addedDate: new Date().getTime(),
				} satisfies Recipe,
			)

			addRecipe.mutate(recipe, {
				onSuccess: ({ id }) =>
					navigate({
						to: '/recipes/$id',
						params: { id },
						replace: true,
					}),
			})
		} catch (error) {
			notify(t('newRecipe.invalid'))
		}
	}

	return (
		<Fragment>
			{renderProbe}
			<TopAppBar
				configuration="small"
				title={t('newRecipe.title')}
				onBackClick={() => history.length > 1 ? history.back() : window.close()}
			/>
			<RecipeForm
				id={formId}
				onSubmit={onSubmit}
			/>
			<ContentOverlayPortal>
				<FabContainer>
					<FloatingActionButton
						icon="save"
						label={t('newRecipe.fields.save')}
						type="submit"
						variant="primary"
						size={isContentScrolled ? undefined : 'expanded'}
						form={formId}
					/>
				</FabContainer>
			</ContentOverlayPortal>
		</Fragment>
	)
}

const FabContainer = styled('div', {
	base: {
		display: 'flex',
		paddingInline: 16,
		paddingBottom: 16,
		justifyContent: 'flex-end',
		position: 'relative',
		bottom: 'env(keyboard-inset-height, 0)',
	},
})
