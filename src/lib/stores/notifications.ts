import { createStore } from '@codemaskinc/store'

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

export const notificationsStore = createStore<{
	notifications: Array<Notification>
}>({
	notifications: [],
})
