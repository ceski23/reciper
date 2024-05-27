import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { userInfoQuery } from 'features/auth/queries'
import { accountStore } from 'lib/stores/account'

export const useUserInfo = () => {
	const { user, setUser, accountProvider } = accountStore.useStore()
	const { data, status } = useQuery({
		...userInfoQuery(accountProvider),
		placeholderData: user,
		staleTime: 1000 * 60,
	})

	useEffect(() => {
		if (status === 'success') {
			setUser(data)
		}
	}, [status, data, setUser])

	return data
}
