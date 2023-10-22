import { styled } from '@macaron-css/react'
import eggsImage from 'assets/images/eggs.png'
import { Fragment, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export const Units: FunctionComponent = () => {
	const { t } = useTranslation()

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={t('paths.units')}
				/>
			</HeaderPortal>
			<List>
				<ListItem.Switch
					leadingElement="scale"
					iconColor={theme.colors.primary}
					title="Units conversion"
					text="Convert units to preferred ones"
				/>
				<ListItem.Simple
					leadingElement="numbers"
					iconColor={theme.colors.primary}
					title="Conversion precision"
					text="Round up to 2 decimal digits"
				/>
			</List>
			<PreferredUnitsSection>
				<Typography.TitleMedium>
					Ingredients preferred units
				</Typography.TitleMedium>
			</PreferredUnitsSection>
			<List>
				<ListItem.Simple
					title="Eggs"
					text="Preferred unit: kilogram"
					leadingElement={(
						<IngredientImage
							alt="Eggs"
							src={eggsImage}
						/>
					)}
				/>
			</List>
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
