import { createFileRoute } from '@tanstack/react-router'
import { Units } from 'features/settings/Units'

export const Route = createFileRoute('/settings/units')({
	component: Units,
})
