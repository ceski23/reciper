import { styled } from '@macaron-css/react'
import { mq } from '@styles/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type ChangeEventHandler, Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import * as v from 'valibot'
import { useUserInfo } from 'features/auth/hooks'
import { GoogleProvider } from 'features/auth/providers/google/provider'
import { logoutMutation } from 'features/auth/queries'
import { useNotifications } from 'features/notifications'
import { recipesQuery, useAddRecipes } from 'features/recipes/recipes'
import { recipeScheme } from 'features/recipes/types'
import { Button } from 'lib/components/Button'
import { List } from 'lib/components/list'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { accountStore } from 'lib/stores/account'
import { settingsStore } from 'lib/stores/settings'
import { theme } from 'lib/styles'
import { isDefined } from 'lib/utils'
import { downloadBlob } from 'lib/utils/download'

export const Account: FunctionComponent = () => {
	const { t } = useTranslation()
	const userInfo = useUserInfo()
	const { accountProvider } = accountStore.useStore()
	const logout = useMutation({
		...logoutMutation(accountProvider),
		onSuccess: () => accountStore.reset(),
	})
	const recipes = useQuery(recipesQuery())
	const addRecipes = useAddRecipes()
	const { notify } = useNotifications()
	const navigate = useNavigate()
	const { account, setAccount } = settingsStore.useStore()

	const handleRecipesExport = () => {
		const json = JSON.stringify(recipes.data)
		const blob = new Blob([json], { type: 'application/json' })

		downloadBlob(`recipes-${new Date().toISOString()}.json`, blob)
	}

	const handleUrlsExport = () => {
		if (recipes.data === undefined) {
			return
		}

		const urls = Object.values(recipes.data).map(recipe => recipe.url).filter(isDefined)
		const text = urls.join('\n')
		const blob = new Blob([text], { type: 'text/plain' })

		downloadBlob(`recipes-urls-${new Date().toISOString()}.txt`, blob)
	}

	const handleRecipesImport: ChangeEventHandler<HTMLInputElement> = async event => {
		if (!event.currentTarget.files) return

		const [file] = event.currentTarget.files
		const text = await file.text()

		try {
			const importedRecipes = v.parse(v.array(recipeScheme), JSON.parse(text))
			await addRecipes.mutateAsync(importedRecipes)

			notify(t('settings.account.quickActions.import.success', { count: importedRecipes.length }))
		} catch (error) {
			notify(t('settings.account.quickActions.import.error'), { duration: Number.POSITIVE_INFINITY })
		}
	}

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				title={t('paths.account')}
				onBackClick={() => navigate({ to: '/settings' })}
			/>
			<StyledList>
				{userInfo === undefined
					? (
						<List.SimpleItem
							title={t('settings.account.loggedOutTitle')}
							text={t('settings.account.loggedOutText')}
							trailingElement={<Button onClick={GoogleProvider.startLogin}>{t('settings.account.login')}</Button>}
							leadingElement="google_color"
							iconColor={theme.colors.primary}
						/>
					)
					: (
						<List.SimpleItem
							leadingElement={(
								<Avatar
									alt={userInfo.name}
									src={userInfo.avatar}
								/>
							)}
							title={userInfo.name}
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
				<List.SwitchItem
					leadingElement="sync"
					iconColor={theme.colors.primary}
					title={t('settings.account.sync.title')}
					text={t('settings.account.sync.text')}
					isDisabled={userInfo === undefined}
					switchProps={{
						checked: account.sync,
						onCheckedChange: sync => setAccount(prev => ({ ...prev, sync })),
					}}
				/>
			</StyledList>
			<QuickActionsSection>
				<Typography.TitleMedium>
					{t('settings.account.quickActions.title')}
				</Typography.TitleMedium>
				<ImportExportContainer>
					<Button leftIcon="fileUpload">
						<HiddenFileInput
							type="file"
							accept="application/json"
							onChange={handleRecipesImport}
						/>
						{t('settings.account.quickActions.importFile')}
					</Button>
					<Button
						leftIcon="fileDownload"
						disabled={recipes.status !== 'success'}
						onClick={handleRecipesExport}
					>
						{t('settings.account.quickActions.exportFile')}
					</Button>
				</ImportExportContainer>
				<Button
					leftIcon="link"
					disabled={recipes.status !== 'success'}
					onClick={handleUrlsExport}
				>
					{t('settings.account.quickActions.exportUrls')}
				</Button>
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
		'@media': {
			[mq.atLeast('md')]: {
				paddingInline: 0,
				maxWidth: '800px',
			},
		},
	},
})

const ImportExportContainer = styled('div', {
	base: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: 16,
	},
})

const HiddenFileInput = styled('input', {
	base: {
		position: 'absolute',
		inset: 0,
		opacity: 0,
		cursor: 'pointer',
	},
})

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
