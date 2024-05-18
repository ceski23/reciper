import { type SpringValue, useTransition } from '@react-spring/web'
import { type FunctionComponent } from 'react'
import { DIALOG_ANIMATION } from 'lib/components/dialog/constants'

export const withDialogAnimation = <TProps extends { styles?: Record<string, SpringValue<number>>; open?: boolean }>(
	Component: FunctionComponent<TProps>,
) =>
({
	open,
	...props
}: TProps) => {
	const transition = useTransition(open, DIALOG_ANIMATION)

	return transition((styles, open) => (
		// @ts-expect-error I can't into TypeScript :(
		<Component
			styles={styles}
			open={open}
			{...props}
		/>
	))
}
