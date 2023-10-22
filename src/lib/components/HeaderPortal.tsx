import { atom, useAtomValue } from 'jotai'
import { type FunctionComponent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type HeaderPortalProps = {
	children?: ReactNode
}

export const headerRefAtom = atom<HTMLElement | null>(null)

export const HeaderPortal: FunctionComponent<HeaderPortalProps> = ({ children }) => {
	const headerRef = useAtomValue(headerRefAtom)

	return headerRef ? createPortal(children, headerRef) : null
}
