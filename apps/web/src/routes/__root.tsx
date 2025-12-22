import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { defaultLightThemeClass } from '@repo/ui/theme'

const RootDocument = ({ children }: { children: ReactNode }) => (
	<html lang="en">
		<head>
			<HeadContent />
		</head>
		<body className={defaultLightThemeClass}>
			{children}
			<TanStackDevtools
				config={{
					position: 'bottom-right',
					hideUntilHover: true,
				}}
				plugins={[
					{
						name: 'Tanstack Router',
						render: <TanStackRouterDevtoolsPanel />,
					},
					{
						name: 'Tanstack Query',
						render: <ReactQueryDevtoolsPanel />,
					},
				]}
			/>
			<Scripts />
		</body>
	</html>
)

type RouterContext = {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
	}),
	shellComponent: RootDocument,
})
