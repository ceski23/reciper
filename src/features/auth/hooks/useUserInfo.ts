import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useAccountProvider } from 'features/auth/hooks'
import { userInfoQuery } from 'features/auth/queries'
import { accountDataAtom } from 'lib/stores/account'

export const useUserInfo = () => {
	const [accountData, setAccountData] = useAtom(accountDataAtom)
	const { data: user, status } = useQuery({
		...userInfoQuery(useAccountProvider()),
		placeholderData: accountData.user,
		staleTime: 1000 * 60,
	})

	useEffect(() => {
		if (status === 'success') {
			setAccountData(prev => ({ ...prev, user }))
		}
	}, [setAccountData, status, user])

	return user
}
