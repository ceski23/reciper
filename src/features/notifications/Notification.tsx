import { type FunctionComponent, useEffect, useRef } from 'react'
import { type NotificationOptions } from './store'
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

	useEffect(() => {
		if (!hasRendered.current) {
			hasRendered.current = true
			notify(content, rest)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return null
}
