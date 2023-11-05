import { atom, useAtom } from 'jotai'

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
	const [notifications, setNotifications] = useAtom(notificationsAtom)

	const notify = (content: string, {
		id = crypto.randomUUID(),
		duration = 5000,
		...options
	}: Partial<Omit<Notification, 'content'>> = {}) => {
		setNotifications(prev =>
			prev.concat({
				content,
				id,
				duration,
				...options,
			})
		)
	}

	const hide = (id: string) => setNotifications(prev => prev.filter(notification => notification.id !== id))

	return {
		notifications,
		notify,
		hide,
	}
}
