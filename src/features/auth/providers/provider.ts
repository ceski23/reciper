import i18next from 'i18next'
import ky from 'ky'
import { notificationsAtom } from 'lib/hooks/useNotifications'
import { accessTokenAtom, accountDataAtom } from 'lib/stores/account'
import { store } from 'lib/stores/settings'

export type UserInfo = {
	name: string
	avatar: string
}

type Tokens = {
	accessToken: string
	refreshToken: string
}

export abstract class AccountProvider {
	static providerName: string
	static icon: string
	static startLogin: (this: void) => void
	static completeLogin: () => Promise<Tokens & { user: UserInfo }>
	abstract refreshAccessToken(): Promise<string>
	abstract getUserInfo(): Promise<UserInfo>
	abstract logout(): Promise<void>
	// abstract uploadRecipes(recipes: RecipesState & PersistPartial): Promise<void>
	// abstract downloadRecipes(): Promise<(RecipesState & PersistPartial) | undefined>

	apiClient = ky.extend({
		prefixUrl: 'https://www.googleapis.com',
		retry: 0,
		hooks: {
			beforeRequest: [
				request => {
					const accessToken = store.get(accessTokenAtom)

					if (accessToken) {
						request.headers.set('Authorization', `Bearer ${accessToken}`)
					}
				},
			],
			afterResponse: [
				async (input, _options, response) => {
					if (response.status === 401) {
						try {
							const newAccessToken = await this.refreshAccessToken()

							store.set(accessTokenAtom, newAccessToken)
							input.headers.set('Authorization', `Bearer ${newAccessToken}`)

							return ky(input)
						} catch (error) {
							store.set(accountDataAtom, {})
							store.set(notificationsAtom, prev =>
								prev.concat({
									id: 'errorLogout',
									content: i18next.t('auth.logoutError.text'),
									duration: Infinity,
									action: { label: i18next.t('auth.logoutError.action') },
								}))

							return response
						}
					}

					return response
				},
			],
		},
	})
}
