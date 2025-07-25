import { uiStore } from '@stores/ui'
import type { FunctionComponent, ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ContentOverlayPortalProps = {
	children?: ReactNode
}

export const ContentOverlayPortal: FunctionComponent<ContentOverlayPortalProps> = ({ children }) => {
	const { overlayContainer } = uiStore.useStore()

	return overlayContainer ? createPortal(children, overlayContainer) : null
}
