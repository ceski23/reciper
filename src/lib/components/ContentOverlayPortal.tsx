import { atom, useAtomValue } from 'jotai'
import { type FunctionComponent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ContentOverlayPortalProps = {
	children?: ReactNode
}

export const overlayContainerRefAtom = atom<HTMLElement | null>(null)

export const ContentOverlayPortal: FunctionComponent<ContentOverlayPortalProps> = ({ children }) => {
	const overlayContainerRef = useAtomValue(overlayContainerRefAtom)

	return overlayContainerRef ? createPortal(children, overlayContainerRef) : null
}
