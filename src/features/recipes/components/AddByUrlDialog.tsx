import { styled } from '@macaron-css/react'
import { useNavigate } from '@tanstack/react-router'
import { type FunctionComponent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components2/Button'
import { SimpleDialog } from 'lib/components2/dialog/Dialog'
import { withDialogAnimation } from 'lib/components2/dialog/withDialogAnimation'
import { TextInput } from 'lib/components2/TextInput'

type AddByUrlDialogProps = {
	open?: boolean
	onClose: () => void
}

export const AddByUrlDialog: FunctionComponent<AddByUrlDialogProps> = withDialogAnimation(({
	onClose,
	open,
	...props
}) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [url, setUrl] = useState('')
	const formId = useId()

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
						disabled={url === ''}
					>
						{t('recipes.addRecipe.addByUrl.import')}
					</Button>
				),
			]}
			extraContent={(
				<UrlFieldForm
					id={formId}
					onSubmit={event => {
						event.preventDefault()
						if (url !== '') navigate({ to: '/recipes/scrape', search: { url } })
					}}
				>
					<TextInput
						label={t('recipes.addRecipe.addByUrl.label')}
						value={url}
						onValueChange={setUrl}
						inputProps={{ type: 'url' }}
					/>
				</UrlFieldForm>
			)}
		/>
	)
})

const UrlFieldForm = styled('form', {
	base: {
		display: 'flex',
		paddingInline: 24,
	},
})
