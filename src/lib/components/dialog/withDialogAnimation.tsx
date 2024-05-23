import { type SpringValue, useTransition } from '@react-spring/web'
import { type FunctionComponent } from 'react'
import { DIALOG_ANIMATION } from 'lib/components/dialog/constants'

export const withDialogAnimation = <TProps extends { styles?: Record<string, SpringValue<number>>; open?: boolean }>(
	Component: FunctionComponent<TProps>,
) =>
(props: TProps) => {
	const transition = useTransition(props.open, DIALOG_ANIMATION)

	return transition((styles, open) => (
		<Component
			{...props}
			open={open}
			styles={styles}
		/>
	))
}
