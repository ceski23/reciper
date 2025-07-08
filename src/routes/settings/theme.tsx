import { createFileRoute } from '@tanstack/react-router'
import { Theme } from 'features/settings/Theme'

export const Route = createFileRoute('/settings/theme')({
	component: Theme,
})
