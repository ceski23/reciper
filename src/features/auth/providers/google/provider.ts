import ky from 'ky'
import { type AccountProviderConstructor } from 'features/auth/providers'
import { PATHS } from 'lib/routing/paths'

type GoogleUserInfoResponse = {
	family_name: string
	given_name: string
	id: string
	locale: string
	name: string
	picture: string
}

export const requiredScopes = [
	'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/drive.appdata',
]

export const GoogleProvider: AccountProviderConstructor & { PROVIDER_NAME: string } = (accessToken, onUnauthorized) => {
	const apiClient = ky.create({
		prefixUrl: 'https://www.googleapis.com',
		hooks: {
			beforeRequest: [
				request => {
					request.headers.set('Authorization', `Bearer ${accessToken}`)
				},
			],
			afterResponse: [
				(_input, _options, response) => {
					if (response.status === 401) {
						onUnauthorized?.()
					}
				},
			],
		},
	})

	const getUserInfo = async () => {
		if (!accessToken) throw new Error('Not authorized')

		return apiClient
			.get('oauth2/v1/userinfo')
			.then(res => res.json<GoogleUserInfoResponse>())
			.then(data => ({
				name: data.name,
				avatar: data.picture,
			}))
	}

	const login = async () => {
		// const code_verifier = base64url(randomBytes(96));
		// window.sessionStorage.setItem('code_verifier', code_verifier);

		const params = new URLSearchParams({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			redirect_uri: `${window.location.protocol}//${window.location.host}${PATHS.AUTH.GOOGLE.buildPath({})}`,
			// response_type: 'code',
			response_type: 'token',
			state: window.location.pathname,
			// code_challenge_method: 'S256',
			// code_challenge: await generateCodeChallenge(code_verifier),
			scope: requiredScopes.join(' '),
		})

		const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
		authUrl.search = params.toString()

		window.location.href = authUrl.toString()
	}

	const logout = async () => {
		if (!accessToken) throw new Error('Not authorized')

		const body = new FormData()
		body.append('token', accessToken)

		return apiClient.post('https://oauth2.googleapis.com/revoke', { body, prefixUrl: '' }).then(res => res.json<void>())
	}

	return {
		getUserInfo,
		logout,
		login,
		accessToken,
	}
}

GoogleProvider.PROVIDER_NAME = 'google'
