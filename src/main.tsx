import 'lib/i18n'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import 'lib/styles/global'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'lib/routing/routes'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
