import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import type { UserInfo } from 'features/auth/providers'
import { type SyncStatus } from 'lib/utils/synchronization'

export type AccountData = {
	provider: string | undefined
	accessToken: string | undefined
	refreshToken: string | undefined
	user: UserInfo | undefined
	syncStatus: Record<string, SyncStatus>
}

export const accountStore = createStore<AccountData>({
	provider: storage(),
	accessToken: storage(),
	refreshToken: storage(),
	user: storage(),
	syncStatus: storage({}),
})
