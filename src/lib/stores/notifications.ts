import { createStore } from 'stan-js'

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

type NotificationsStore = {
	notifications: Array<Notification>
}

export const notificationsStore = createStore<NotificationsStore>({
	notifications: [],
})
