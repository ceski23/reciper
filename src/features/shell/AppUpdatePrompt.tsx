import { type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Notification } from 'features/notifications'

export const AppUpdatePrompt: FunctionComponent = () => {
	const { updateServiceWorker, needRefresh: [needRefresh, setNeedRefresh] } = useRegisterSW()
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)

	return needRefresh
		? (
			<Notification
				content={t('appUpdate.updateAvailable')}
				duration={Number.POSITIVE_INFINITY}
				loading={isLoading}
				action={{
					label: t('appUpdate.update'),
					onClick: () => {
						setIsLoading(true)
						setNeedRefresh(false)
						updateServiceWorker()
					},
				}}
			/>
		)
		: null
}
