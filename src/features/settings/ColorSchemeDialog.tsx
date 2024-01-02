import { type SpringValue } from '@react-spring/web'
import { useAtomValue } from 'jotai'
import { type FunctionComponent, useState } from 'react'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/Dialog'
import { RadioGroup } from 'lib/components/RadioGroup'
import { type Settings, settingsAtom } from 'lib/stores/settings'

type ColorSchemeDialogProps = {
	isOpen?: boolean
	styles?: {
		opacity: SpringValue<number>
	}
	onSave: (colorScheme: Settings['theme']['colorScheme']) => void
	onCancel: () => void
}

export const ColorSchemeDialog: FunctionComponent<ColorSchemeDialogProps> = ({ onCancel, onSave, isOpen, styles }) => {
	const settings = useAtomValue(settingsAtom)
	const [selectedColorScheme, setSelectedColorScheme] = useState<Settings['theme']['colorScheme']>(settings.theme.colorScheme)

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
			open={isOpen}
			icon="brightness"
			title="Color scheme"
			description="Select app's color scheme"
			closeOnClickOutside={false}
			content={(
				<RadioGroup.Root
					onValueChange={handleRadioChange}
					value={selectedColorScheme ?? 'system'}
				>
					<RadioGroup.Item
						label="Light"
						value="light"
					/>
					<RadioGroup.Item
						label="Dark"
						value="dark"
					/>
					<RadioGroup.Item
						label="System"
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
						Cancel
					</Button>
				),
				(
					<Button
						key="save"
						variant="filled"
						onClick={() => onSave(selectedColorScheme)}
					>
						Save
					</Button>
				),
			]}
		/>
	)
}
