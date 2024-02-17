import { atomWithStorage } from 'jotai/utils'
import { focusAtom } from 'jotai-optics'
import { type UserInfo } from 'features/auth/providers'

export type AccountData = {
	provider?: string
	accessToken?: string
	refreshToken?: string
	user?: UserInfo
}

export const accountDataAtom = atomWithStorage<AccountData>('accountData', {
	accessToken: undefined,
	refreshToken: undefined,
	user: undefined,
})

export const accessTokenAtom = focusAtom(accountDataAtom, optic => optic.prop('accessToken'))
export const refreshTokenAtom = focusAtom(accountDataAtom, optic => optic.prop('refreshToken'))
