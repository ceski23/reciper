import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'

export const Settings: FunctionComponent = () => {
	const { t } = useTranslation()

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={t('paths.settings')}
				/>
			</HeaderPortal>
			<List>
				<ListItem.Simple
					leadingElement="palette"
					iconColor={theme.colors.primary}
					title="Theme"
					text="Supporting line text lorem ipsum dolor sit amet, consectetur."
				/>
				<ListItem.Link
					leadingElement="account"
					iconColor={theme.colors.primary}
					title="Account and sync"
					text="Supporting line text lorem ipsum dolor sit amet, consectetur."
					to={PATHS.SETTINGS.ACCOUNT.buildPath({})}
				/>
				<ListItem.Link
					leadingElement="scale"
					iconColor={theme.colors.primary}
					title="Units"
					text="Supporting line text lorem ipsum dolor sit amet, consectetur."
					to={PATHS.SETTINGS.UNITS.buildPath({})}
				/>
				<ListItem.Link
					leadingElement="info"
					iconColor={theme.colors.primary}
					title="About app"
					text="Supporting line text lorem ipsum dolor sit amet, consectetur."
					to={PATHS.SETTINGS.ABOUT.buildPath({})}
				/>
			</List>
		</Fragment>
	)
}
