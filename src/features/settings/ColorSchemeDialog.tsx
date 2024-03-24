import { type SpringValue } from '@react-spring/web'
import { type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/Dialog'
import { RadioGroup } from 'lib/components/RadioGroup'
import { type Settings, settingsStore } from 'lib/stores/settings'

type ColorSchemeDialogProps = {
	open?: boolean
	styles?: {
		opacity: SpringValue<number>
	}
	onSave: (colorScheme: Settings['theme']['colorScheme']) => void
	onCancel: () => void
}

export const ColorSchemeDialog: FunctionComponent<ColorSchemeDialogProps> = ({ onCancel, onSave, open, styles }) => {
	const { t } = useTranslation()
	const { state: { theme } } = settingsStore.useStore('theme')
	const [selectedColorScheme, setSelectedColorScheme] = useState<Settings['theme']['colorScheme']>(theme.colorScheme)

	const handleRadioChange = (value: string) => {
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
			styles={styles}
			open={open}
			icon="brightness"
			title={t('settings.theme.colorScheme.dialog.title')}
			description={t('settings.theme.colorScheme.dialog.description')}
			closeOnClickOutside={false}
			content={(
				<RadioGroup.Root
					onValueChange={handleRadioChange}
					value={selectedColorScheme ?? 'system'}
				>
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
}
