export type UserInfo = {
	name: string
	avatar: string
}

export type AccountProvider = {
	accessToken?: string
	login(): Promise<void>
	logout(): Promise<void>
	getUserInfo(): Promise<UserInfo>
}

export type AccountProviderConstructor = (accessToken?: string, onUnauthorized?: VoidFunction) => AccountProvider

export { Google, GoogleProvider } from './google'
