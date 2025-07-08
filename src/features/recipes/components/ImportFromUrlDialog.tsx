import { TextField } from '@components/form/TextField'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { styled } from '@macaron-css/react'
import { useNavigate } from '@tanstack/react-router'
import i18next from 'i18next'
import { type FunctionComponent, useId } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as v from 'valibot'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/dialog/Dialog'
import { withDialogAnimation } from 'lib/components/dialog/withDialogAnimation'

type ImportFromUrlDialogProps = {
	open?: boolean
	onClose: () => void
}

const recipeUrlSchema = () =>
	v.object({
		url: v.pipe(
			v.string(i18next.t('recipes.addRecipe.addByUrl.invalid')),
			v.url(i18next.t('recipes.addRecipe.addByUrl.invalid')),
		),
	})

export const ImportFromUrlDialog: FunctionComponent<ImportFromUrlDialogProps> = withDialogAnimation(({
	onClose,
	open,
	...props
}) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const formId = useId()
	const { control, handleSubmit } = useForm<v.InferOutput<ReturnType<typeof recipeUrlSchema>>>({
		resolver: valibotResolver(recipeUrlSchema()),
	})

	return (
		<SimpleDialog
			{...props}
			title={t('recipes.addRecipe.addByUrl.title')}
			icon="link"
			open={open}
			description={t('recipes.addRecipe.addByUrl.description')}
			onClose={onClose}
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
				(
					<Button
						key="add"
						variant="filled"
						type="submit"
						form={formId}
					>
						{t('recipes.addRecipe.addByUrl.import')}
					</Button>
				),
			]}
			extraContent={(
				<Form
					id={formId}
					noValidate
					onSubmit={event => {
						event.preventDefault()
						event.stopPropagation()
						handleSubmit(({ url }) => navigate({ to: '/recipes/scrape', search: { url } }))(event)
					}}
				>
					<TextField
						label={t('recipes.addRecipe.addByUrl.label')}
						control={control}
						name="url"
						inputProps={{ type: 'url' }}
					/>
				</Form>
			)}
		/>
	)
})

const Form = styled('form', {
	base: {
		display: 'flex',
		paddingInline: 24,
	},
})
