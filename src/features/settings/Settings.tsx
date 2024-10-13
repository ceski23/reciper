import { useNavigate } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageDialog } from 'features/settings/LanguageDialog'
import { List } from 'lib/components/list'
import { TopAppBar } from 'lib/components/TopAppBar'
import { settingsStore } from 'lib/stores/settings'
import { theme } from 'lib/styles'

export const Settings: FunctionComponent = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false)
	const { setLanguage } = settingsStore.useStore()

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				title={t('paths.settings')}
				onBackClick={() => navigate({ to: '/settings' })}
			/>
			<List.Root>
				<List.LinkItem
					leadingElement="palette"
					iconColor={theme.colors.primary}
					title={t('settings.theme.title')}
					text={t('settings.theme.text')}
					to="/settings/theme"
				/>
				<List.LinkItem
					leadingElement="account"
					iconColor={theme.colors.primary}
					title={t('settings.account.title')}
					text={t('settings.account.text')}
					to="/settings/account"
				/>
				<List.LinkItem
					leadingElement="scale"
					iconColor={theme.colors.primary}
					title={t('settings.units.title')}
					text={t('settings.account.text')}
					to="/settings/units"
				/>
				<List.SimpleItem
					leadingElement="language"
					iconColor={theme.colors.primary}
					title={t('settings.language.title')}
					text={t('settings.language.text')}
					onClick={() => setIsLanguageDialogOpen(true)}
				/>
				<List.LinkItem
					leadingElement="info"
					iconColor={theme.colors.primary}
					title={t('settings.about.title')}
					text={t('settings.about.version', { version: `${__APP_VERSION__}-${__COMMIT_HASH__}` })}
				/>
			</List.Root>
			<LanguageDialog
				open={isLanguageDialogOpen}
				onCancel={() => setIsLanguageDialogOpen(false)}
				onSave={language => {
					setIsLanguageDialogOpen(false)
					setLanguage(language)
				}}
			/>
		</Fragment>
	)
}
