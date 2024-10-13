import { styled } from '@macaron-css/react'
import { type SpringValue, useTransition } from '@react-spring/web'
import { type ComponentProps, type FunctionComponent, type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type NotificationOptions, notificationsStore } from './store'
import { useNotifications } from './useNotifications'

export type NotificationComponentProps = NotificationOptions & {
	onHide: () => void
	style: Record<string, SpringValue<number>>
}

type NotificationViewportProps = Omit<ComponentProps<typeof Container>, 'children'> & {
	limit?: number
	notificationComponent: FunctionComponent<NotificationComponentProps>
}

type NotificationWrapperProps = {
	notification: NotificationOptions
	children: ReactNode
	isPaused: boolean
}

const NotificationWrapper: FunctionComponent<NotificationWrapperProps> = ({ notification: { id, duration }, children, isPaused }) => {
	const { hide } = useNotifications()

	useEffect(() => {
		if (isPaused || !Number.isFinite(duration)) return

		const timeout = setTimeout(() => hide(id), duration)

		return () => clearTimeout(timeout)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duration, isPaused])

	return children
}

export const NotificationsViewport: FunctionComponent<NotificationViewportProps> = ({
	limit = 1,
	notificationComponent: Component,
	...props
}) => {
	const { notifications } = notificationsStore.useStore()
	const { hide } = useNotifications()
	const { t } = useTranslation()
	const [isPaused, setIsPaused] = useState(false)
	const transitions = useTransition(notifications.slice(0, limit), {
		from: { opacity: 0, y: 10 },
		enter: { opacity: 1, y: 0 },
		leave: { opacity: 0 },
		exitBeforeEnter: true,
		config: { duration: 200 },
	})

	useEffect(() => {
		const handleVisibilityChange = () => setIsPaused(document.visibilityState === 'hidden')

		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
	})

	return (
		<Container
			{...props}
			aria-label={t('notifications.title')}
			aria-live="assertive"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onPointerDown={() => setIsPaused(true)}
			onPointerUp={() => setIsPaused(false)}
		>
			{transitions((style, notification) => (
				<NotificationWrapper
					key={notification.id}
					notification={notification}
					isPaused={isPaused}
				>
					<Component
						{...notification}
						onHide={() => hide(notification.id)}
						style={style}
					/>
				</NotificationWrapper>
			))}
		</Container>
	)
}

const Container = styled('section', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		padding: 16,
		gap: 8,
		viewTransitionName: 'notifications',
		pointerEvents: 'none',
	},
})
