import { uiStore } from '@stores/ui'
import type { FunctionComponent, ReactNode } from 'react'
import { createPortal } from 'react-dom'

type HeaderPortalProps = {
	children?: ReactNode
}

export const HeaderPortal: FunctionComponent<HeaderPortalProps> = ({ children }) => {
	const { header } = uiStore.useStore()

	return header ? createPortal(children, header) : null
}
