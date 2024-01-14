import { useTransition } from '@react-spring/web'
import React, { type FunctionComponent, type ReactElement } from 'react'
import { useState } from 'react'
import { DIALOG_ANIMATION } from 'lib/components/Dialog'

export const useDialogState = (initialState: boolean) => {
	const [isOpen, setIsOpen] = useState(initialState)
	const transition = useTransition(isOpen, DIALOG_ANIMATION)
	const AnimateDialog: FunctionComponent<{ children: ReactElement }> = ({ children }) =>
		transition((styles, open) => React.cloneElement(children, { styles, open }))

	return {
		AnimateDialog,
		state: [isOpen, setIsOpen] as const,
	}
}
