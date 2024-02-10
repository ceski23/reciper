import { useTransition } from '@react-spring/web'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { DIALOG_ANIMATION, SimpleDialog } from 'lib/components/Dialog'
import { PATHS } from 'lib/routing/paths'
import { accessTokenAtom, accountDataAtom } from 'lib/stores/account'
import { GoogleProvider, requiredScopes } from './provider'

export const Google = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const navigate = useNavigate()
	const params = Object.fromEntries(new URLSearchParams(location.hash.substring(1)))
	const grantedScopes = params.scope.split(' ')
	const areRequiredScopesGranted = requiredScopes.every(scope => grantedScopes.includes(scope))
	const isError = 'error' in params || !areRequiredScopesGranted
	const transition = useTransition(isError, DIALOG_ANIMATION)
	const setAccessToken = useSetAtom(accessTokenAtom)
	const setAccountData = useSetAtom(accountDataAtom)

	if (!isError && params.access_token) {
		setAccessToken(params.access_token)
		setAccountData(prev => ({
			...prev,
			accessToken: params.access_token,
			provider: GoogleProvider.PROVIDER_NAME,
		}))

		return (
			<Navigate
				to={params.state ?? PATHS.HOME.buildPath({})}
				replace
			/>
		)
	}

	return transition((styles, open) => (
		<SimpleDialog
			open={open}
			styles={styles}
			title={t('auth.google.error.title')}
			description={t('auth.google.error.description')}
			actions={[
				{
					label: t('auth.google.error.close'),
					onClick: () => navigate(params.state ?? PATHS.HOME.buildPath({}), { replace: true }),
				},
			]}
		/>
	))
}
