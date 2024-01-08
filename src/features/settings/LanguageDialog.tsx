import { type SpringValue } from '@react-spring/web'
import { useAtomValue } from 'jotai'
import { type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/Dialog'
import { RadioGroup } from 'lib/components/RadioGroup'
import { LANGUAGES } from 'lib/i18n'
import { languageAtom, type Settings } from 'lib/stores/settings'

type LanguageDialogProps = {
	open?: boolean
	styles?: {
		opacity: SpringValue<number>
	}
	onSave: (language: Settings['language']) => void
	onCancel: () => void
}

export const LanguageDialog: FunctionComponent<LanguageDialogProps> = ({ onCancel, onSave, open, styles }) => {
	const { t } = useTranslation()
	const language = useAtomValue(languageAtom)
	const [selectedLanguage, setSelectedLanguage] = useState<Settings['language']>(language)

	return (
		<SimpleDialog
			styles={styles}
			open={open}
			icon="language"
			title={t('settings.language.title')}
			description={t('settings.language.text')}
			onOpenChange={onCancel}
			content={(
				<RadioGroup.Root
					onValueChange={value => setSelectedLanguage(value === 'system' ? undefined : value)}
					value={selectedLanguage ?? 'system'}
				>
					<RadioGroup.Item
						label={t('settings.theme.colorScheme.dialog.options.system')}
						value="system"
					/>
					{Object.entries(LANGUAGES).map(([value, label]) => (
						<RadioGroup.Item
							key={value}
							label={label}
							value={value}
						/>
					))}
				</RadioGroup.Root>
			)}
			actions={[
				(
					<Button
						key="cancel"
						variant="text"
						onClick={onCancel}
					>
						{t('settings.theme.colorScheme.dialog.cancel')}
					</Button>
				),
				(
					<Button
						key="save"
						variant="filled"
						onClick={() => onSave(selectedLanguage)}
					>
						{t('settings.theme.colorScheme.dialog.save')}
					</Button>
				),
			]}
		/>
	)
}
