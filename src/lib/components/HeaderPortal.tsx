import * as Portal from '@radix-ui/react-portal'
import { atom, useAtomValue } from 'jotai'
import { type FunctionComponent, type ReactNode } from 'react'

type HeaderPortalProps = {
	children?: ReactNode
}

export const headerRefAtom = atom<HTMLElement | null>(null)

export const HeaderPortal: FunctionComponent<HeaderPortalProps> = ({ children }) => {
	const headerRef = useAtomValue(headerRefAtom)

	return (
		<Portal.Root
			container={headerRef}
			asChild
		>
			{children}
		</Portal.Root>
	)
}
