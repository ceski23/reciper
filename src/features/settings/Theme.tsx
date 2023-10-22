import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { theme } from 'lib/styles'

export const Theme: FunctionComponent = () => {
	const { t } = useTranslation()

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
				/>
				<ListItem.Switch
					leadingElement="palette"
					iconColor={theme.colors.primary}
					title="Dynamic colors"
					text="Use dynamic color scheme based on recipe’s image colors"
					size="3line"
				/>
				<ListItem.Switch
					leadingElement="animation"
					iconColor={theme.colors.primary}
					title="Disable animations"
					text="Disable all animations inside app"
				/>
			</List>
		</Fragment>
	)
}
