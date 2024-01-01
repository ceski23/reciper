import { useReducedMotion } from '@react-spring/web'
import { useAtom } from 'jotai'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ColorSchemeDialog } from 'features/settings/ColorSchemeDialog'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { settingsAtom } from 'lib/stores/settings'
import { theme } from 'lib/styles'

export const Theme: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isColorSchemeDialogOpen, setIsColorSchemeDialogOpen] = useState(false)
	const [settings, setSettings] = useAtom(settingsAtom)
	const isReducedMotion = useReducedMotion() ?? false

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={t('paths.theme')}
				/>
			</HeaderPortal>
			<List>
				<ListItem.Simple
					leadingElement="brightness"
					iconColor={theme.colors.primary}
					title="Color scheme"
					text="Supporting line text lorem ipsum dolor sit amet, consectetur."
					onClick={() => setIsColorSchemeDialogOpen(true)}
				/>
				<ListItem.Switch
					leadingElement="palette"
					iconColor={theme.colors.primary}
					title="Dynamic colors"
					text="Use dynamic color scheme based on recipe’s image colors"
					size="3line"
					switchProps={{
						checked: settings.theme.dynamicColor,
						onCheckedChange: dynamicColor => setSettings(prev => ({ ...prev, theme: { ...prev.theme, dynamicColor } })),
					}}
				/>
				<ListItem.Switch
					leadingElement="animation"
					iconColor={theme.colors.primary}
					title="Disable animations"
					text={isReducedMotion ? 'Forced by system settings' : 'Disable all animations inside app'}
					switchProps={{
						checked: isReducedMotion ? true : settings.theme.disabledAnimations,
						onCheckedChange: disabledAnimations => setSettings(prev => ({ ...prev, theme: { ...prev.theme, disabledAnimations } })),
					}}
					isDisabled={isReducedMotion}
				/>
			</List>
			{isColorSchemeDialogOpen && (
				<ColorSchemeDialog
					onCancel={() => setIsColorSchemeDialogOpen(false)}
					onSave={colorScheme => {
						setIsColorSchemeDialogOpen(false)
						setSettings(prev => ({
							...prev,
							theme: {
								...prev.theme,
								colorScheme,
							},
						}))
					}}
				/>
			)}
		</Fragment>
	)
}
