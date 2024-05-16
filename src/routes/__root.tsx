import { createRootRoute, Navigate } from '@tanstack/react-router'
import { Layout } from 'lib/components/Layout'

export const Route = createRootRoute({
	component: Layout,
	notFoundComponent: () => (
		<Navigate
			to="/"
			replace
		/>
	),
})
