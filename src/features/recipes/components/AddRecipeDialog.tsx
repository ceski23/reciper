import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/dialog/Dialog'
import { withDialogAnimation } from 'lib/components/dialog/withDialogAnimation'
import { Icon } from 'lib/components/Icon'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'

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
			onOpenChange={onClose}
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
			content={(
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
