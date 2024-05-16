import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import type { UserInfo } from 'features/auth/providers'

export type AccountData = {
	provider?: string
	accessToken?: string
	refreshToken?: string
	user?: UserInfo
}

export const accountStore = createStore({
	provider: storage<AccountData['provider']>(),
	accessToken: storage<AccountData['accessToken']>(),
	refreshToken: storage<AccountData['refreshToken']>(),
	user: storage<AccountData['user']>(),
})
