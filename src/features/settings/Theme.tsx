import { styled } from '@macaron-css/react'
import { useReducedMotion } from '@react-spring/web'
import { mq } from '@styles/utils'
import { useNavigate } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ColorSchemeDialog } from 'features/settings/ColorSchemeDialog'
import { List } from 'lib/components/list'
import { TopAppBar } from 'lib/components/TopAppBar'
import { settingsStore } from 'lib/stores/settings'
import { theme } from 'lib/styles'

export const Theme: FunctionComponent = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [isColorSchemeDialogOpen, setIsColorSchemeDialogOpen] = useState(false)
	const { setTheme, theme: themeSettings } = settingsStore.useStore()
	const isReducedMotion = useReducedMotion() ?? false

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				title={t('paths.theme')}
				onBackClick={() => navigate({ to: '/settings' })}
			/>
			<StyledList>
				<List.SimpleItem
					leadingElement="brightness"
					iconColor={theme.colors.primary}
					title={t('settings.theme.colorScheme.title')}
					onClick={() => setIsColorSchemeDialogOpen(true)}
				/>
				<List.SwitchItem
					leadingElement="palette"
					iconColor={theme.colors.primary}
					title={t('settings.theme.dynamicColors.title')}
					text={t('settings.theme.dynamicColors.text')}
					size="3line"
					switchProps={{
						checked: themeSettings.dynamicColor,
						onCheckedChange: dynamicColor => setTheme(prev => ({ ...prev, dynamicColor })),
					}}
				/>
				<List.SwitchItem
					leadingElement="animation"
					iconColor={theme.colors.primary}
					title={t('settings.theme.disableAnimations.title')}
					text={isReducedMotion ? t('settings.theme.disableAnimations.forcedText') : t('settings.theme.disableAnimations.text')}
					switchProps={{
						checked: isReducedMotion ? true : themeSettings.disabledAnimations,
						onCheckedChange: disabledAnimations => setTheme(prev => ({ ...prev, disabledAnimations })),
					}}
					isDisabled={isReducedMotion}
				/>
			</StyledList>
			<ColorSchemeDialog
				open={isColorSchemeDialogOpen}
				onCancel={() => setIsColorSchemeDialogOpen(false)}
				onSave={colorScheme => {
					setIsColorSchemeDialogOpen(false)
					setTheme(prev => ({ ...prev, colorScheme }))
				}}
			/>
		</Fragment>
	)
}

const StyledList = styled(List.Root, {
	base: {
		'@media': {
			[mq.atLeast('md')]: {
				backgroundColor: theme.colors.surfaceContainerLow,
				borderRadius: 12,
				overflow: 'clip',
				maxWidth: '800px',
			},
		},
	},
})
