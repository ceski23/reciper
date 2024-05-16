import { useTransition } from '@react-spring/web'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Route as googleAuthRoute } from 'routes/auth/google'
import { DIALOG_ANIMATION, SimpleDialog } from 'lib/components/Dialog'
import { accountStore } from 'lib/stores/account'
import { GoogleProvider } from './provider'

export const Google = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { scope, error, state } = googleAuthRoute.useSearch()
	const areRequiredScopesGranted = GoogleProvider.requiredScopes.every(requiredScope => scope.includes(requiredScope))
	const { setAccessToken, setProvider, setRefreshToken, setUser } = accountStore.useStore()
	const { isSuccess, data, isError: isCompleteLoginError } = useQuery({
		queryKey: ['code'],
		queryFn: GoogleProvider.completeLogin,
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})
	const isError = Boolean(error) || !areRequiredScopesGranted || isCompleteLoginError
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
				to={state ?? '/'}
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
					onClick: () => navigate({ to: state ?? '/', replace: true }),
				},
			]}
		/>
	))
}
