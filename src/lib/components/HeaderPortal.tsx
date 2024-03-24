import { type FunctionComponent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { uiStore } from 'lib/stores/ui'

type HeaderPortalProps = {
	children?: ReactNode
}

export const HeaderPortal: FunctionComponent<HeaderPortalProps> = ({ children }) => {
	const { state: { header } } = uiStore.useStore('header')

	return header ? createPortal(children, header) : null
}
