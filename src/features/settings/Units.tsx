import { styled } from '@macaron-css/react'
import eggsImage from 'assets/images/eggs.png'
import { type FunctionComponent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MainContent } from 'lib/components/Layout'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export const Units: FunctionComponent = () => {
	const { t } = useTranslation()
	const contentRef = useRef<HTMLElement>(null!)

	return (
		<MainContent ref={contentRef}>
			<TopAppBar
				configuration="large"
				title={t('paths.units')}
				container={contentRef}
			/>
			<List>
				<ListItem.Switch
					leadingElement="scale"
					iconColor={theme.colors.primary}
					title={t('settings.units.conversion.title')}
					text={t('settings.units.conversion.text')}
				/>
				<ListItem.Simple
					leadingElement="numbers"
					iconColor={theme.colors.primary}
					title={t('settings.units.precision.title')}
					text={t('settings.units.precision.text', { count: 2 })}
				/>
			</List>
			<PreferredUnitsSection>
				<Typography.TitleMedium>
					{t('settings.units.preferred.title')}
				</Typography.TitleMedium>
			</PreferredUnitsSection>
			<List>
				<ListItem.Simple
					title="Eggs"
					text={t('settings.units.preferred.preferred', { unit: 'kilogram' })}
					leadingElement={(
						<IngredientImage
							alt="Eggs"
							src={eggsImage}
						/>
					)}
				/>
			</List>
		</MainContent>
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
