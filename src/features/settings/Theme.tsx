import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/Dialog'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { RadioGroup } from 'lib/components/RadioGroup'
import { TopAppBar } from 'lib/components/TopAppBar'
import { theme } from 'lib/styles'

export const Theme: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isColorSchemeDialogOpen, setIsColorSchemeDialogOpen] = useState(false)

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
				/>
				<ListItem.Switch
					leadingElement="animation"
					iconColor={theme.colors.primary}
					title="Disable animations"
					text="Disable all animations inside app"
				/>
			</List>
			<SimpleDialog
				open={isColorSchemeDialogOpen}
				onOpenChange={setIsColorSchemeDialogOpen}
				icon="brightness"
				title="Color scheme"
				description="Select app's color scheme"
				closeOnClickOutside={false}
				content={(
					<RadioGroup.Root name="test">
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
							onClick={() => setIsColorSchemeDialogOpen(false)}
						>
							Cancel
						</Button>
					),
					(
						<Button
							key="save"
							variant="filled"
							onClick={() => setIsColorSchemeDialogOpen(false)}
						>
							Save
						</Button>
					),
				]}
			/>
		</Fragment>
	)
}
