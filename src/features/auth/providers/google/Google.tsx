import { useTransition } from '@react-spring/web'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { DIALOG_ANIMATION, SimpleDialog } from 'lib/components/Dialog'
import { PATHS } from 'lib/routing/paths'
import { accountStore } from 'lib/stores/account'
import { GoogleProvider } from './provider'

export const Google = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const navigate = useNavigate()
	const params = Object.fromEntries(new URLSearchParams(location.search))
	const grantedScopes = params.scope.split(' ')
	const areRequiredScopesGranted = GoogleProvider.requiredScopes.every(scope => grantedScopes.includes(scope))
	const { actions: { setAccessToken, setProvider, setRefreshToken, setUser } } = accountStore.useStore()
	const { isSuccess, data, isError: isCompleteLoginError } = useQuery({
		queryKey: ['code'],
		queryFn: GoogleProvider.completeLogin,
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})
	const isError = 'error' in params || !areRequiredScopesGranted || isCompleteLoginError
	const transition = useTransition(isError, DIALOG_ANIMATION)

	if (isSuccess && !isError) {
		queueMicrotask(() => {
			setAccessToken(data.accessToken)
			setRefreshToken(data.refreshToken)
			setProvider(GoogleProvider.providerName)
			setUser(data.user)
		})

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
