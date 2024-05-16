import { type Notification, notificationsStore } from 'lib/stores/notifications'

export const useNotifications = () => {
	const { setNotifications } = notificationsStore.useStore()
	const notify = (content: string, {
		id = crypto.randomUUID(),
		duration = 5000,
		...options
	}: Partial<Omit<Notification, 'content'>> = {}) => {
		queueMicrotask(() =>
			setNotifications(prev =>
				prev.concat({
					content,
					id,
					duration,
					...options,
				})
			)
		)
	}
	const hide = (id: string) => setNotifications(prev => prev.filter(notification => notification.id !== id))

	return {
		notify,
		hide,
	}
}
