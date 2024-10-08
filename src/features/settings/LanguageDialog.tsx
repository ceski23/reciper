import { type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/dialog/Dialog'
import { withDialogAnimation } from 'lib/components/dialog/withDialogAnimation'
import { RadioGroup } from 'lib/components2/RadioGroup'
import { LANGUAGES } from 'lib/i18n'
import { type Settings, settingsStore } from 'lib/stores/settings'

type LanguageDialogProps = {
	open?: boolean
	onSave: (language: Settings['language']) => void
	onCancel: () => void
}

export const LanguageDialog: FunctionComponent<LanguageDialogProps> = withDialogAnimation(({
	onCancel,
	onSave,
	open,
	...props
}) => {
	const { t } = useTranslation()
	const { language } = settingsStore.useStore()
	const [selectedLanguage, setSelectedLanguage] = useState<Settings['language']>(language)

	return (
		<SimpleDialog
			{...props}
			open={open}
			icon="language"
			title={t('settings.language.title')}
			description={t('settings.language.text')}
			onOpenChange={onCancel}
			content={(
				<RadioGroup.Provider
					setValue={value => setSelectedLanguage(value === 'system' ? undefined : String(value))}
					value={selectedLanguage ?? 'system'}
				>
					<RadioGroup.Root>
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
				</RadioGroup.Provider>
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
})
