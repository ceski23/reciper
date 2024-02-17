import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { accountDataAtom } from 'lib/stores/account'
import { GoogleProvider } from '../providers/google/provider'

export const useAccountProvider = () => {
	const accountData = useAtomValue(accountDataAtom)

	return useMemo(() => {
		switch (accountData.provider) {
			case GoogleProvider.providerName:
				return new GoogleProvider()
			default:
				return undefined
		}
	}, [accountData.provider])
}
