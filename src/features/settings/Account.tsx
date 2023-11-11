import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export const Account: FunctionComponent = () => {
	const { t } = useTranslation()

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={t('paths.account')}
				/>
			</HeaderPortal>
			<List>
				<ListItem.Simple
					leadingElement={(
						<Avatar
							alt="Cezary Bober"
							src="https://thispersondoesnotexist.com/"
						/>
					)}
					title="Cezary Bober"
					text="You are logged in to your Google account"
					trailingElement={<Button>Logout</Button>}
				/>
				<ListItem.Switch
					leadingElement="sync"
					iconColor={theme.colors.primary}
					title="Recipes synchronization"
					text="Automatically synchronize your recipes"
				/>
			</List>
			<QuickActionsSection>
				<Typography.TitleMedium>
					Quick actions
				</Typography.TitleMedium>
				<ImportExportContainer>
					<Button leftIcon="fileUpload">Import from file</Button>
					<Button leftIcon="fileDownload">Export to file</Button>
				</ImportExportContainer>
				<Button leftIcon="link">Export recipes urls</Button>
			</QuickActionsSection>
		</Fragment>
	)
}

const Avatar = styled('img', {
	base: {
		width: 24,
		height: 24,
		borderRadius: '50%',
	},
})

const QuickActionsSection = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingInline: 20,
		paddingBlock: 20,
	},
})

const ImportExportContainer = styled('div', {
	base: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: 16,
	},
})
