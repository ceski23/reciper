import { useSetAtom } from 'jotai'
import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageDialog } from 'features/settings/LanguageDialog'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDialogState } from 'lib/hooks/useDialogState'
import { PATHS } from 'lib/routing/paths'
import { languageAtom } from 'lib/stores/settings'
import { theme } from 'lib/styles'

export const Settings: FunctionComponent = () => {
	const { t } = useTranslation()
	const { AnimateDialog, state: [, setIsLanguageDialogOpen] } = useDialogState(false)
	const setLanguage = useSetAtom(languageAtom)

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={t('paths.settings')}
				/>
			</HeaderPortal>
			<List>
				<ListItem.Link
					leadingElement="palette"
					iconColor={theme.colors.primary}
					title={t('settings.theme.title')}
					text={t('settings.theme.text')}
					to={PATHS.SETTINGS.THEME.buildPath({})}
				/>
				<ListItem.Link
					leadingElement="account"
					iconColor={theme.colors.primary}
					title={t('settings.account.title')}
					text={t('settings.account.text')}
					to={PATHS.SETTINGS.ACCOUNT.buildPath({})}
				/>
				<ListItem.Link
					leadingElement="scale"
					iconColor={theme.colors.primary}
					title={t('settings.units.title')}
					text={t('settings.account.text')}
					to={PATHS.SETTINGS.UNITS.buildPath({})}
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
					to={PATHS.SETTINGS.ABOUT.buildPath({})}
				/>
			</List>
			<AnimateDialog>
				<LanguageDialog
					onCancel={() => setIsLanguageDialogOpen(false)}
					onSave={language => {
						setIsLanguageDialogOpen(false)
						setLanguage(language)
					}}
				/>
			</AnimateDialog>
		</Fragment>
	)
}
