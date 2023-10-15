import 'lib/i18n'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import 'lib/styles/global'
import { routes } from 'lib/routing'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
