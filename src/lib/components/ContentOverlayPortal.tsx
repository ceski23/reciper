import { type FunctionComponent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { uiStore } from 'lib/stores/ui'

type ContentOverlayPortalProps = {
	children?: ReactNode
}

export const ContentOverlayPortal: FunctionComponent<ContentOverlayPortalProps> = ({ children }) => {
	const { state: { overlayContainer } } = uiStore.useStore('overlayContainer')

	return overlayContainer ? createPortal(children, overlayContainer) : null
}
