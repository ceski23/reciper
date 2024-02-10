import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { GoogleProvider } from 'features/auth/providers'
import { accountDataAtom } from 'lib/stores/account'

export const useAccountProvider = (onUnauthorized?: VoidFunction) => {
	const accountData = useAtomValue(accountDataAtom)

	return useMemo(() => {
		switch (accountData.provider) {
			case GoogleProvider.PROVIDER_NAME:
			default:
				return GoogleProvider(accountData.accessToken, onUnauthorized)
		}
	}, [accountData.accessToken, accountData.provider, onUnauthorized])
}
