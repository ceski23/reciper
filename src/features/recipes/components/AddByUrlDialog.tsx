import { styled } from '@macaron-css/react'
import { type SpringValue } from '@react-spring/web'
import { type FunctionComponent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/Dialog'
import { TextField } from 'lib/components/TextField'
import { PATHS } from 'lib/routing/paths'

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
	const formRef = useRef<HTMLFormElement>(null)

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
						onClick={() => formRef.current?.submit()}
						disabled={url === ''}
					>
						{t('recipes.addRecipe.addByUrl.import')}
					</Button>
				),
			]}
			content={(
				<UrlFieldForm
					ref={formRef}
					onSubmit={event => {
						event.preventDefault()
						if (url !== '') navigate(PATHS.RECIPES.SCRAPE.buildPath({}, { url }))
					}}
				>
					<TextField
						label={t('recipes.addRecipe.addByUrl.label')}
						value={url}
						onValueChange={setUrl}
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
