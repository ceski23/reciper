import { createFileRoute } from '@tanstack/react-router'
import { Account } from 'features/settings/Account'

export const Route = createFileRoute('/settings/account')({
	component: Account,
})
