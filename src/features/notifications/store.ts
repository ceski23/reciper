import { createStore } from 'stan-js'

export type NotificationOptions = {
	id: string
	content: string
	duration: number
	dismissable?: boolean
	loading?: boolean
	action?: {
		label: string
		onClick?: VoidFunction
	}
}

type NotificationsStore = {
	notifications: Array<NotificationOptions>
}

export const notificationsStore = createStore<NotificationsStore>({
	notifications: [],
})
