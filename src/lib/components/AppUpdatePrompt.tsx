import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Snackbar } from './Snackbar'

export const AppUpdatePrompt: FunctionComponent = () => {
	const { updateServiceWorker, needRefresh: [needRefresh, setNeedRefresh] } = useRegisterSW()
	const { t } = useTranslation()

	return needRefresh
		? (
			<Snackbar
				text={t('appUpdate.updateAvailable')}
				duration={Number.POSITIVE_INFINITY}
				action={{
					label: t('appUpdate.update'),
					onClick: () => {
						setNeedRefresh(false)
						updateServiceWorker()
					},
				}}
			/>
		)
		: null
}
