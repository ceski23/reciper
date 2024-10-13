import { useTransition } from '@react-spring/web'
import React, { type FunctionComponent, type ReactElement } from 'react'
import { DIALOG_ANIMATION } from './constants'

type AnimateDialogProps = {
	open: boolean
	children: ReactElement
}

export const AnimateDialog: FunctionComponent<AnimateDialogProps> = ({ children, open }) => {
	const transition = useTransition(open, DIALOG_ANIMATION)

	return transition((styles, open) => React.cloneElement(children, { styles, open }))
}
