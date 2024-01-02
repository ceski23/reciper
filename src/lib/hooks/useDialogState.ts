import { config, useTransition } from '@react-spring/web'
import React, { type FunctionComponent, type ReactElement } from 'react'
import { useState } from 'react'

export const useDialogState = (initialState: boolean) => {
	const [isOpen, setIsOpen] = useState(initialState)
	const transition = useTransition(isOpen, {
		from: { opacity: 0, y: 100 },
		enter: { opacity: 1, y: 0 },
		leave: { opacity: 0, y: 100 },
		config: config.stiff,
	})
	const AnimateDialog: FunctionComponent<{ children: ReactElement }> = ({ children }) =>
		transition((styles, open) => React.cloneElement(children, { styles, open }))

	return {
		AnimateDialog,
		state: [isOpen, setIsOpen] as const,
	}
}
