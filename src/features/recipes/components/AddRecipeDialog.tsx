import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { Icon } from 'lib/components/Icon'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { SimpleDialog } from 'lib/components2/dialog/Dialog'
import { withDialogAnimation } from 'lib/components2/dialog/withDialogAnimation'

type AddRecipeDialogProps = {
	open?: boolean
	onClose: VoidFunction
	onAddByUrl: VoidFunction
}

export const AddRecipeDialog: FunctionComponent<AddRecipeDialogProps> = withDialogAnimation(({
	onClose,
	open,
	onAddByUrl,
	...props
}) => {
	const { t } = useTranslation()

	return (
		<SimpleDialog
			{...props}
			title={t('recipes.addRecipe.title')}
			description={t('recipes.addRecipe.description')}
			icon="recipes"
			onClose={onClose}
			open={open}
			actions={[
				(
					<Button
						key="cancel"
						variant="text"
						onClick={onClose}
					>
						{t('recipes.addRecipe.close')}
					</Button>
				),
			]}
			extraContent={(
				<List>
					<ListItem.Link
						to="/recipes/new"
						title={t('recipes.addRecipe.addManually')}
						leadingElement={(
							<Icon
								name="pencil"
								size={24}
							/>
						)}
					/>
					<ListItem.Simple
						title={t('recipes.addRecipe.addByUrl.title')}
						leadingElement={(
							<Icon
								name="link"
								size={24}
							/>
						)}
						onClick={onAddByUrl}
					/>
				</List>
			)}
		/>
	)
})
