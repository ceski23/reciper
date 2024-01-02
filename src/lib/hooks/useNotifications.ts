import { atom, useSetAtom } from 'jotai'

export type Notification = {
	id: string
	content: string
	duration: number
	dismissable?: boolean
	action?: {
		label: string
		onClick?: VoidFunction
	}
}

export const notificationsAtom = atom<Array<Notification>>([])

export const useNotifications = () => {
	const setNotifications = useSetAtom(notificationsAtom)
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
