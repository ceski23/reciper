import { useReducedMotion } from '@react-spring/web'
import { useAtom } from 'jotai'
import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { ColorSchemeDialog } from 'features/settings/ColorSchemeDialog'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDialogState } from 'lib/hooks/useDialogState'
import { settingsAtom } from 'lib/stores/settings'
import { theme } from 'lib/styles'

export const Theme: FunctionComponent = () => {
	const { t } = useTranslation()
	const { AnimateDialog, state: [, setIsColorSchemeDialogOpen] } = useDialogState(false)
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
					title={t('settings.theme.colorScheme.title')}
					onClick={() => setIsColorSchemeDialogOpen(true)}
				/>
				<ListItem.Switch
					leadingElement="palette"
					iconColor={theme.colors.primary}
					title={t('settings.theme.dynamicColors.title')}
					text={t('settings.theme.dynamicColors.text')}
					size="3line"
					switchProps={{
						checked: settings.theme.dynamicColor,
						onCheckedChange: dynamicColor => setSettings(prev => ({ ...prev, theme: { ...prev.theme, dynamicColor } })),
					}}
				/>
				<ListItem.Switch
					leadingElement="animation"
					iconColor={theme.colors.primary}
					title={t('settings.theme.disableAnimations.title')}
					text={isReducedMotion ? t('settings.theme.disableAnimations.forcedText') : t('settings.theme.disableAnimations.text')}
					switchProps={{
						checked: isReducedMotion ? true : settings.theme.disabledAnimations,
						onCheckedChange: disabledAnimations => setSettings(prev => ({ ...prev, theme: { ...prev.theme, disabledAnimations } })),
					}}
					isDisabled={isReducedMotion}
				/>
			</List>
			<AnimateDialog>
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
			</AnimateDialog>
		</Fragment>
	)
}
