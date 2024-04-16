import { useReducedMotion } from '@react-spring/web'
import { type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ColorSchemeDialog } from 'features/settings/ColorSchemeDialog'
import { MainContent } from 'lib/components/Layout'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDialogState } from 'lib/hooks/useDialogState'
import { settingsStore } from 'lib/stores/settings'
import { theme } from 'lib/styles'

export const Theme: FunctionComponent = () => {
	const { t } = useTranslation()
	const { AnimateDialog, state: [, setIsColorSchemeDialogOpen] } = useDialogState(false)
	const { state: settings, actions: { setTheme } } = settingsStore.useStore('theme')
	const [container, setContainer] = useState<HTMLElement | null>(null)
	const isReducedMotion = useReducedMotion() ?? false

	return (
		<MainContent ref={setContainer}>
			<TopAppBar
				key={String(container)}
				configuration="large"
				title={t('paths.theme')}
				container={container}
			/>
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
						onCheckedChange: dynamicColor => setTheme(prev => ({ ...prev, dynamicColor })),
					}}
				/>
				<ListItem.Switch
					leadingElement="animation"
					iconColor={theme.colors.primary}
					title={t('settings.theme.disableAnimations.title')}
					text={isReducedMotion ? t('settings.theme.disableAnimations.forcedText') : t('settings.theme.disableAnimations.text')}
					switchProps={{
						checked: isReducedMotion ? true : settings.theme.disabledAnimations,
						onCheckedChange: disabledAnimations => setTheme(prev => ({ ...prev, disabledAnimations })),
					}}
					isDisabled={isReducedMotion}
				/>
			</List>
			<AnimateDialog>
				<ColorSchemeDialog
					onCancel={() => setIsColorSchemeDialogOpen(false)}
					onSave={colorScheme => {
						setIsColorSchemeDialogOpen(false)
						setTheme(prev => ({ ...prev, colorScheme }))
					}}
				/>
			</AnimateDialog>
		</MainContent>
	)
}
