import { createStore, storage } from '@codemaskinc/store'
import { type UserInfo } from 'features/auth/providers'

export type AccountData = {
	provider?: string
	accessToken?: string
	refreshToken?: string
	user?: UserInfo
}

export const accountStore = createStore<AccountData>({
	provider: storage(),
	accessToken: storage(),
	refreshToken: storage(),
	user: storage(),
})
