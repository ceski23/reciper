import { type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { TopAppBar } from 'lib/components/TopAppBar'

export const Home: FunctionComponent = () => {
	const { t } = useTranslation()

	return (
		<HeaderPortal>
			<TopAppBar
				configuration="small"
				title={t('paths.home')}
			/>
		</HeaderPortal>
	)
}
