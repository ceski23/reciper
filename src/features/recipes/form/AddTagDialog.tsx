import { valibotResolver } from '@hookform/resolvers/valibot'
import { styled } from '@macaron-css/react'
import { type SpringValue } from '@react-spring/web'
import { type FunctionComponent, useId } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type * as v from 'valibot'
import { recipeFormSchema } from 'features/recipes/form/scheme'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/Dialog'
import { TextField } from 'lib/components/form/TextField'

type AddTagDialogProps = {
	open?: boolean
	styles?: {
		opacity: SpringValue<number>
	}
	onClose: VoidFunction
	onAddTag: (tag: string) => void
}

type TagFormValues = v.Output<ReturnType<typeof recipeFormSchema>['entries']['tags']['wrapped']['item']>

export const AddTagDialog: FunctionComponent<AddTagDialogProps> = ({ onClose, open, styles, onAddTag }) => {
	const { t } = useTranslation()
	const formId = useId()
	const { control, handleSubmit } = useForm<TagFormValues>({
		resolver: valibotResolver(recipeFormSchema().entries.tags.wrapped.item),
	})

	return (
		<SimpleDialog
			open={open}
			styles={styles}
			onOpenChange={onClose}
			title={t('newRecipe.fields.tags.dialog.title')}
			description={t('newRecipe.fields.tags.dialog.description')}
			content={(
				<Form
					id={formId}
					noValidate
					onSubmit={event => {
						event.preventDefault()
						event.stopPropagation()
						handleSubmit(({ text }) => onAddTag(text))(event)
					}}
				>
					<TextField
						label={t('newRecipe.fields.tags.dialog.label')}
						control={control}
						name="text"
					/>
				</Form>
			)}
			actions={[
				(
					<Button
						key="cancel"
						variant="text"
						type="button"
						onClick={onClose}
					>
						{t('newRecipe.fields.tags.dialog.cancel')}
					</Button>
				),
				(
					<Button
						key="add"
						form={formId}
						variant="filled"
						type="submit"
					>
						{t('newRecipe.fields.tags.dialog.add')}
					</Button>
				),
			]}
		/>
	)
}

const Form = styled('form', {
	base: {
		display: 'flex',
		paddingInline: 24,
	},
})
