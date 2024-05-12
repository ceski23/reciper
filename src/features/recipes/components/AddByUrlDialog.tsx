import { styled } from '@macaron-css/react'
import { type SpringValue } from '@react-spring/web'
import { useNavigate } from '@tanstack/react-router'
import { type FunctionComponent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/Dialog'
import { TextInput } from 'lib/components/TextInput'

type AddByUrlDialogProps = {
	open?: boolean
	styles?: {
		opacity: SpringValue<number>
	}
	onClose: () => void
}

export const AddByUrlDialog: FunctionComponent<AddByUrlDialogProps> = ({ onClose, open, styles }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [url, setUrl] = useState('')
	const formId = useId()

	return (
		<SimpleDialog
			title={t('recipes.addRecipe.addByUrl.title')}
			icon="link"
			styles={styles}
			open={open}
			description={t('recipes.addRecipe.addByUrl.description')}
			onOpenChange={onClose}
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
			content={(
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
}

const UrlFieldForm = styled('form', {
	base: {
		display: 'flex',
		paddingInline: 24,
	},
})
