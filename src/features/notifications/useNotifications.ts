import { type NotificationOptions, notificationsStore } from './store'

export const useNotifications = () => {
	const { setNotifications } = notificationsStore.useStore()
	const notify = (content: string, {
		id = crypto.randomUUID(),
		duration,
		...options
	}: Partial<Omit<NotificationOptions, 'content'>> = {}) => {
		queueMicrotask(() =>
			setNotifications(prev =>
				prev.concat({
					content,
					id,
					duration: duration ?? (options.action ? Infinity : 5000),
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
