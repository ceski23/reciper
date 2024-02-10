import { atomWithStorage } from 'jotai/utils'
import { focusAtom } from 'jotai-optics'
import { type UserInfo } from 'features/auth/providers'

export type AccountData = {
	provider?: string
	accessToken?: string
	user?: UserInfo
}

export const accountDataAtom = atomWithStorage<AccountData>('accountData', {
	accessToken: undefined,
	user: undefined,
})

export const accessTokenAtom = focusAtom(accountDataAtom, optic => optic.prop('accessToken'))
