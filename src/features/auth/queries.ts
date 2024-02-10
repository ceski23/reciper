import { queryOptions, type UseMutationOptions } from '@tanstack/react-query'
import { type AccountProvider } from 'features/auth/providers'

export const userInfoQuery = (provider: AccountProvider) =>
	queryOptions({
		queryKey: ['userInfo', provider.accessToken],
		queryFn: provider.getUserInfo,
		enabled: provider.accessToken !== undefined,
	})

export const logoutMutation = (provider?: AccountProvider): UseMutationOptions<void, Error, void> => ({
	mutationFn: provider?.logout,
})
