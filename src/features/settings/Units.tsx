import { styled } from '@macaron-css/react'
import { useNavigate } from '@tanstack/react-router'
import eggsImage from 'assets/images/eggs.png'
import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { List } from 'lib/components/list'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export const Units: FunctionComponent = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				title={t('paths.units')}
				onBackClick={() => navigate({ to: '/settings' })}
			/>
			<List.Root>
				<List.SwitchItem
					leadingElement="scale"
					iconColor={theme.colors.primary}
					title={t('settings.units.conversion.title')}
					text={t('settings.units.conversion.text')}
				/>
				<List.SimpleItem
					leadingElement="numbers"
					iconColor={theme.colors.primary}
					title={t('settings.units.precision.title')}
					text={t('settings.units.precision.text', { count: 2 })}
				/>
			</List.Root>
			<PreferredUnitsSection>
				<Typography.TitleMedium>
					{t('settings.units.preferred.title')}
				</Typography.TitleMedium>
			</PreferredUnitsSection>
			<List.Root>
				<List.SimpleItem
					title="Eggs"
					text={t('settings.units.preferred.preferred', { unit: 'kilogram' })}
					leadingElement={(
						<IngredientImage
							alt="Eggs"
							src={eggsImage}
						/>
					)}
				/>
			</List.Root>
		</Fragment>
	)
}

const PreferredUnitsSection = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingInline: 20,
		paddingBlock: 20,
	},
})

const IngredientImage = styled('img', {
	base: {
		width: 24,
		height: 24,
	},
})
