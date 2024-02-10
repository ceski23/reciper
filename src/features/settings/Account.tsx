import { styled } from '@macaron-css/react'
import { useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccountProvider } from 'features/auth/hooks'
import { logoutMutation } from 'features/auth/queries'
import { Button } from 'lib/components/Button'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { accountDataAtom } from 'lib/stores/account'
import { theme } from 'lib/styles'

export const Account: FunctionComponent = () => {
	const { t } = useTranslation()
	const accountData = useAtomValue(accountDataAtom)
	const resetAccountData = useResetAtom(accountDataAtom)
	const accountProvider = useAccountProvider()
	const logout = useMutation({
		...logoutMutation(accountProvider),
		onSuccess: () => {
			resetAccountData()
		},
	})

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={t('paths.account')}
				/>
			</HeaderPortal>
			<List>
				{accountData.user === undefined
					? (
						<ListItem.Simple
							title={t('settings.account.loggedOutTitle')}
							text={t('settings.account.loggedOutText')}
							trailingElement={<Button onClick={accountProvider.login}>{t('settings.account.login')}</Button>}
							leadingElement="google_color"
							iconColor={theme.colors.primary}
						/>
					)
					: (
						<ListItem.Simple
							leadingElement={(
								<Avatar
									alt={accountData.user.name}
									src={accountData.user.avatar}
								/>
							)}
							title={accountData.user.name}
							text={t('settings.account.loggedInText')}
							trailingElement={(
								<Button
									disabled={logout.isPending}
									onClick={() => logout.mutate()}
								>
									{t('settings.account.logout')}
								</Button>
							)}
						/>
					)}
				<ListItem.Switch
					leadingElement="sync"
					iconColor={theme.colors.primary}
					title={t('settings.account.sync.title')}
					text={t('settings.account.sync.text')}
				/>
			</List>
			<QuickActionsSection>
				<Typography.TitleMedium>
					{t('settings.account.quickActions.title')}
				</Typography.TitleMedium>
				<ImportExportContainer>
					<Button leftIcon="fileUpload">{t('settings.account.quickActions.importFile')}</Button>
					<Button leftIcon="fileDownload">{t('settings.account.quickActions.exportFile')}</Button>
				</ImportExportContainer>
				<Button leftIcon="link">{t('settings.account.quickActions.exportUrls')}</Button>
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
