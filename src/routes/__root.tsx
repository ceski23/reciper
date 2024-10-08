import { createRootRoute, Navigate } from '@tanstack/react-router'
import { Layout } from 'features/shell/Layout'

export const Route = createRootRoute({
	component: Layout,
	notFoundComponent: () => (
		<Navigate
			to="/"
			replace
		/>
	),
})
