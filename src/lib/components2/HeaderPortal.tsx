import type { FunctionComponent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { uiStore } from 'lib/stores/ui'

type HeaderPortalProps = {
	children?: ReactNode
}

export const HeaderPortal: FunctionComponent<HeaderPortalProps> = ({ children }) => {
	const { header } = uiStore.useStore()

	return header ? createPortal(children, header) : null
}