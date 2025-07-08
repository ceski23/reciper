import ky from 'ky'
import { Route as googleAuthRoute } from 'routes/auth/google'
import { type Recipe } from 'features/recipes/types'
import { accountStore } from 'lib/stores/account'
import { base64url, generateCodeChallenge, randomBytes } from 'lib/utils/oauth'
import { AccountProvider } from '../provider'

type GoogleUserInfoResponse = {
	family_name: string
	given_name: string
	id: string
	locale: string
	name: string
	picture: string
}

type GoogleDriveFileResponse = {
	kind: 'drive#file'
	id: string
	name: string
	mimeType: string
}

type GoogleDriveFilesResponse = {
	kind: 'drive#fileList'
	files: Array<GoogleDriveFileResponse>
}

type AuthReturnedParams = {
	access_token: string
	refresh_token: string
	expires_in: string
	scope: string
	token_type: 'Bearer'
	state?: string
}

export class GoogleProvider extends AccountProvider {
	static providerName = 'google'
	static requiredScopes = [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/drive.appdata',
	]

	async getUserInfo() {
		return this.apiClient
			.get('oauth2/v1/userinfo')
			.then(res => res.json<GoogleUserInfoResponse>())
			.then(data => ({
				name: data.name,
				avatar: data.picture,
			}))
	}

	static async startLogin() {
		const code_verifier = base64url(randomBytes(96))
		window.sessionStorage.setItem('code_verifier', code_verifier)

		const params = new URLSearchParams({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			redirect_uri: `${window.location.protocol}//${window.location.host}${googleAuthRoute.fullPath}`,
			response_type: 'code',
			state: window.location.pathname,
			code_challenge_method: 'S256',
			code_challenge: await generateCodeChallenge(code_verifier),
			scope: GoogleProvider.requiredScopes.join(' '),
			access_type: 'offline',
		})

		const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
		authUrl.search = params.toString()

		window.location.href = authUrl.toString()
	}

	static async completeLogin() {
		if (typeof import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'string') {
			throw Error('Google client_id not provided')
		}

		const params = new URLSearchParams(window.location.search)
		const code_verifier = window.sessionStorage.getItem('code_verifier') as string

		const tokenResponse = await ky.post('https://oauth2.googleapis.com/token', {
			body: new URLSearchParams({
				client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
				client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
				grant_type: 'authorization_code',
				code: params.get('code') as string,
				redirect_uri: `${window.location.protocol}//${window.location.host}${googleAuthRoute.fullPath}`,
				code_verifier,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		const responseData = await tokenResponse.json<AuthReturnedParams>()
		const userData = await ky.get('https://www.googleapis.com/oauth2/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${responseData.access_token}`,
			},
		}).json<GoogleUserInfoResponse>()

		return {
			accessToken: responseData.access_token,
			refreshToken: responseData.refresh_token,
			user: {
				name: userData.name,
				avatar: userData.picture,
			},
		}
	}

	async logout() {
		const accessToken = accountStore.getState().accessToken
		const body = new FormData()

		if (accessToken) {
			body.append('token', accessToken)
		}

		return ky.post('https://oauth2.googleapis.com/revoke', { body }).json<void>()
	}

	async refreshAccessToken() {
		const refreshToken = accountStore.getState().refreshToken

		if (!refreshToken) {
			throw Error('No refresh token available')
		}

		const response = await ky.post('https://oauth2.googleapis.com/token', {
			searchParams: new URLSearchParams({
				client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
				client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
			}),
		}).json<{ access_token: string }>()

		return response.access_token
	}

	private async findRecipesFile() {
		const response = await this.apiClient.get('drive/v3/files', {
			searchParams: {
				q: 'name=\'recipes.json\'',
				spaces: 'appDataFolder',
			},
		})

		return response.json<GoogleDriveFilesResponse>()
	}

	private async createBackupFile(content: string) {
		const formData = new FormData()
		const metadata = new Blob([JSON.stringify({
			name: 'recipes.json',
			parents: ['appDataFolder'],
		})], {
			type: 'application/json',
		})
		const file = new Blob([content], {
			type: 'application/json',
		})

		formData.append('metadata', metadata)
		formData.append('file', file)

		const response = await this.apiClient.post('upload/drive/v3/files', {
			searchParams: {
				uploadType: 'multipart',
			},
			body: formData,
		})

		return response.json<GoogleDriveFileResponse>()
	}

	async uploadRecipes(recipes: Record<string, Recipe>) {
		const searchResponse = await this.findRecipesFile()
		const fileId = searchResponse.files?.[0]?.id

		if (!fileId) {
			await this.createBackupFile(JSON.stringify(recipes))
		} else {
			await this.apiClient.patch(`upload/drive/v3/files/${fileId}`, {
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(recipes),
				searchParams: {
					uploadType: 'media',
				},
			})
		}
	}

	async downloadRecipes() {
		const searchResponse = await this.findRecipesFile()
		let fileId = searchResponse.files?.[0]?.id

		if (!fileId) {
			fileId = (await this.createBackupFile('')).id
		}

		const response = await this.apiClient.get(`drive/v3/files/${fileId}`, {
			searchParams: {
				alt: 'media',
			},
		})

		if (response.headers.get('Content-Length') === '0') {
			return {}
		}

		return response.json<Record<string, Recipe>>()
	}
}
