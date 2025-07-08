import { type SyncStatus } from '@utils/synchronization'
import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import { type AccountProvider, type UserInfo } from 'features/auth/providers'
import { GoogleProvider } from 'features/auth/providers/google/provider'

type AccountData = {
	provider: string | undefined
	accessToken: string | undefined
	refreshToken: string | undefined
	user: UserInfo | undefined
	syncStatus: Record<string, SyncStatus>
	accountProvider: AccountProvider | undefined
}

export const accountStore = createStore<AccountData>({
	provider: storage(),
	accessToken: storage(),
	refreshToken: storage(),
	user: storage(),
	syncStatus: storage({}),
	get accountProvider(): AccountProvider | undefined {
		switch (this.provider) {
			case GoogleProvider.providerName:
				return new GoogleProvider()
			default:
				return undefined
		}
	},
})
