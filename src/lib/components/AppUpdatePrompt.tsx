import { type FunctionComponent } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Snackbar } from './Snackbar'

export const AppUpdatePrompt: FunctionComponent = () => {
	const { updateServiceWorker, needRefresh: [needRefresh, setNeedRefresh] } = useRegisterSW()

	return needRefresh
		? (
			<Snackbar
				text="App update available"
				duration={Infinity}
				action={{
					label: 'Update',
					onClick: () => {
						setNeedRefresh(false)
						updateServiceWorker()
					},
				}}
			/>
		)
		: null
}
