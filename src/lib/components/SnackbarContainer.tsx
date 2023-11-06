import { styled } from '@macaron-css/react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { type ComponentProps, type FunctionComponent } from 'react'
import { useNotifications } from 'lib/hooks/useNotifications'
import { Snackbar } from './Snackbar'

type SnackbarContainerProps = {
	limit?: number
}

export const SnackbarContainer: FunctionComponent<SnackbarContainerProps & ComponentProps<typeof Container>> = ({
	limit = 1,
	...props
}) => {
	const { notifications, hide } = useNotifications()

	return (
		<Container {...props}>
			{notifications.slice(0, limit).map(({ content, duration, id, action, dismissable }) => (
				<Snackbar
					key={id}
					text={content}
					dismissable={dismissable}
					duration={duration}
					onOpenChange={() => hide(id)}
					action={action}
					forceMount
				/>
			))}
		</Container>
	)
}

const Container = styled(ToastPrimitive.Viewport, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		padding: 16,
		gap: 8,
	},
})
