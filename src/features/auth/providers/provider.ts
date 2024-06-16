import i18next from 'i18next'
import ky, { HTTPError } from 'ky'
import { notificationsStore } from 'features/notifications'
import { type Recipe } from 'features/recipes/types'
import { accountStore } from 'lib/stores/account'

export type UserInfo = {
	name: string
	avatar: string
}

type Tokens = {
	accessToken: string
	refreshToken: string
}

export abstract class AccountProvider {
	private refreshAccessTokenTask: Promise<string> | null = null
	static providerName: string
	static icon: string
	static startLogin: (this: void) => void
	static completeLogin: () => Promise<Tokens & { user: UserInfo }>
	abstract refreshAccessToken(): Promise<string>
	abstract getUserInfo(): Promise<UserInfo>
	abstract logout(): Promise<void>
	abstract uploadRecipes(recipes: Record<string, Recipe>): Promise<void>
	abstract downloadRecipes(): Promise<(Record<string, Recipe>) | undefined>

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
							if (this.refreshAccessTokenTask === null) {
								this.refreshAccessTokenTask = this.refreshAccessToken().then(newAccessToken => {
									this.refreshAccessTokenTask = null
									accountStore.actions.setAccessToken(newAccessToken)

									return newAccessToken
								})
							}

							input.headers.set('Authorization', `Bearer ${await this.refreshAccessTokenTask}`)

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
							if (error instanceof HTTPError) {
								const text = await error.response.text()
								notificationsStore.actions.setNotifications(prev =>
									prev.concat({
										id: 'errorLogoutError',
										content: text,
										duration: Number.POSITIVE_INFINITY,
										action: { label: i18next.t('auth.logoutError.action') },
									})
								)
							}

							return response
						}
					}

					return response
				},
			],
		},
	})
}
