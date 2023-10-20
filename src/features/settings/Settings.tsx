import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'

export const Settings: FunctionComponent = () => {
	const { t } = useTranslation()

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={t('paths.settings')}
				/>
			</HeaderPortal>
			<Typography.BodyMedium style={{ marginTop: '110vh' }}>Test</Typography.BodyMedium>
		</Fragment>
	)
}
