import { queryOptions, skipToken, type UseMutationOptions } from '@tanstack/react-query'
import type { AccountProvider } from 'features/auth/providers'

export const userInfoQuery = (provider?: AccountProvider) =>
	queryOptions({
		queryKey: ['userInfo', provider],
		queryFn: provider !== undefined ? () => provider.getUserInfo() : skipToken,
		retry: false,
	})

export const logoutMutation = (provider?: AccountProvider): UseMutationOptions<void, Error, void> => ({
	mutationFn: provider ? () => provider.logout() : undefined,
})
