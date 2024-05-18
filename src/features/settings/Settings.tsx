import { useNavigate } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageDialog } from 'features/settings/LanguageDialog'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
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
			<List>
				<ListItem.Link
					leadingElement="palette"
					iconColor={theme.colors.primary}
					title={t('settings.theme.title')}
					text={t('settings.theme.text')}
					to="/settings/theme"
				/>
				<ListItem.Link
					leadingElement="account"
					iconColor={theme.colors.primary}
					title={t('settings.account.title')}
					text={t('settings.account.text')}
					to="/settings/account"
				/>
				<ListItem.Link
					leadingElement="scale"
					iconColor={theme.colors.primary}
					title={t('settings.units.title')}
					text={t('settings.account.text')}
					to="/settings/units"
				/>
				<ListItem.Simple
					leadingElement="language"
					iconColor={theme.colors.primary}
					title={t('settings.language.title')}
					text={t('settings.language.text')}
					onClick={() => setIsLanguageDialogOpen(true)}
				/>
				<ListItem.Link
					leadingElement="info"
					iconColor={theme.colors.primary}
					title={t('settings.about.title')}
					text={t('settings.about.version', { version: `${__APP_VERSION__}-${__COMMIT_HASH__}` })}
				/>
			</List>
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
