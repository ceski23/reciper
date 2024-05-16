import i18next from 'i18next'
import ky from 'ky'
import { accountStore } from 'lib/stores/account'
import { notificationsStore } from 'lib/stores/notifications'

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
					const accessToken = accountStore.getState().accessToken

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

							accountStore.actions.setAccessToken(newAccessToken)
							input.headers.set('Authorization', `Bearer ${newAccessToken}`)

							return ky(input)
						} catch (error) {
							accountStore.reset()
							notificationsStore.actions.setNotifications(prev =>
								prev.concat({
									id: 'errorLogout',
									content: i18next.t('auth.logoutError.text'),
									duration: Number.POSITIVE_INFINITY,
									action: { label: i18next.t('auth.logoutError.action') },
								})
							)

							return response
						}
					}

					return response
				},
			],
		},
	})
}
