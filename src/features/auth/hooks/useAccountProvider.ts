import { useMemo } from 'react'
import { accountStore } from 'lib/stores/account'
import { GoogleProvider } from '../providers/google/provider'

export const useAccountProvider = () => {
	const { provider } = accountStore.useStore()

	return useMemo(() => {
		switch (provider) {
			case GoogleProvider.providerName:
				return new GoogleProvider()
			default:
				return undefined
		}
	}, [provider])
}
