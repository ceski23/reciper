import { styled } from '@macaron-css/react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { useTransition } from '@react-spring/web'
import { type ComponentProps, type CSSProperties, type FunctionComponent } from 'react'
import { useNotifications } from 'lib/hooks/useNotifications'
import { Snackbar } from './Snackbar'

type SnackbarContainerProps = {
	style?: CSSProperties
	limit?: number
}

export const SnackbarContainer: FunctionComponent<SnackbarContainerProps & ComponentProps<typeof Container>> = ({
	limit = 1,
	...props
}) => {
	const { notifications, hide } = useNotifications()
	const transitions = useTransition(notifications.slice(0, limit), {
		from: { opacity: 0, y: 10 },
		enter: { opacity: 1, y: 0 },
		leave: { opacity: 0 },
		exitBeforeEnter: true,
		config: {
			duration: 200,
		},
	})

	return (
		<Container {...props}>
			{transitions((style, { content, duration, id, action, dismissable }) => (
				<Snackbar
					key={id}
					style={style}
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
