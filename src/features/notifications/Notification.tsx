import { type FunctionComponent, useEffect, useId, useRef } from 'react'
import { type NotificationOptions, notificationsStore } from './store'
import { useNotifications } from './useNotifications'

type NotificationProps = Omit<NotificationOptions, 'id' | 'duration'> & {
	id?: string
	duration?: number
}

export const Notification: FunctionComponent<NotificationProps> = ({
	content,
	...rest
}) => {
	const hasRendered = useRef(false)
	const { notify } = useNotifications()
	const { setNotifications } = notificationsStore.useStore()
	const id = useId()

	useEffect(() => {
		if (!hasRendered.current) {
			hasRendered.current = true
			notify(content, { id, ...rest })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (hasRendered.current) {
			setNotifications(prev =>
				prev.map(notification => {
					if (notification.id === id) {
						return { ...notification, content, ...rest }
					}

					return notification
				})
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content, rest.loading])

	return null
}
