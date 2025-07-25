import { type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/dialog/Dialog'
import { withDialogAnimation } from 'lib/components/dialog/withDialogAnimation'
import { RadioGroup } from 'lib/components/RadioGroup'
import { type Settings, settingsStore } from 'lib/stores/settings'

type ColorSchemeDialogProps = {
	open: boolean
	onSave: (colorScheme: Settings['theme']['colorScheme']) => void
	onCancel: () => void
}

export const ColorSchemeDialog: FunctionComponent<ColorSchemeDialogProps> = withDialogAnimation(({
	onCancel,
	onSave,
	open,
	...props
}) => {
	const { t } = useTranslation()
	const { theme } = settingsStore.useStore()
	const [selectedColorScheme, setSelectedColorScheme] = useState<Settings['theme']['colorScheme']>(theme.colorScheme)

	const handleRadioChange = (value: string | number | null) => {
		switch (value) {
			case 'light':
				return setSelectedColorScheme('light')
			case 'dark':
				return setSelectedColorScheme('dark')
			default:
				return setSelectedColorScheme(undefined)
		}
	}

	return (
		<SimpleDialog
			{...props}
			open={open}
			icon="brightness"
			title={t('settings.theme.colorScheme.dialog.title')}
			description={t('settings.theme.colorScheme.dialog.description')}
			onClose={onCancel}
			extraContent={(
				<RadioGroup.Provider
					setValue={handleRadioChange}
					value={selectedColorScheme ?? 'system'}
				>
					<RadioGroup.Root>
						<RadioGroup.Item
							label={t('settings.theme.colorScheme.dialog.options.light')}
							value="light"
						/>
						<RadioGroup.Item
							label={t('settings.theme.colorScheme.dialog.options.dark')}
							value="dark"
						/>
						<RadioGroup.Item
							label={t('settings.theme.colorScheme.dialog.options.system')}
							value="system"
						/>
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
						onClick={() => onSave(selectedColorScheme)}
					>
						{t('settings.theme.colorScheme.dialog.save')}
					</Button>
				),
			]}
		/>
	)
})
