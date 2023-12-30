import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'
import { IconButton } from 'lib/components/IconButton'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'
import Icon from '~virtual/svg-component'

export const IngredientsSection: FunctionComponent = () => {
	return (
		<Container>
			<Header>
				<Typography.TitleLarge>
					Ingredients
				</Typography.TitleLarge>
				<HeaderCount>4 products</HeaderCount>
			</Header>
			<Spinbox>
				<IconButton
					icon="minus"
					title="Decrease servings"
				/>
				<Typography.LabelLarge>2 servings</Typography.LabelLarge>
				<IconButton
					icon="plus"
					title="Increase servings"
				/>
			</Spinbox>
			<IngredientsList>
				<IngredientItem>
					<IngredientIcon name="ingredient" />
					<Typography.BodyMedium>
						<Grammage>700g</Grammage> mięsa wołowego z kością
					</Typography.BodyMedium>
				</IngredientItem>
				<IngredientItem>
					<IngredientIcon name="ingredient" />
					<Typography.BodyMedium>
						<Grammage>700g</Grammage> mięsa wołowego z kością
					</Typography.BodyMedium>
				</IngredientItem>
				<IngredientItem>
					<IngredientIcon name="ingredient" />
					<Typography.BodyMedium>
						<Grammage>700g</Grammage> mięsa wołowego z kością
					</Typography.BodyMedium>
				</IngredientItem>
				<IngredientItem>
					<IngredientIcon name="ingredient" />
					<Typography.BodyMedium>
						<Grammage>700g</Grammage> mięsa wołowego z kością
					</Typography.BodyMedium>
				</IngredientItem>
			</IngredientsList>
		</Container>
	)
}

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		color: theme.colors.onBackground,
	},
})

const Header = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})

const HeaderCount = styled(Typography.LabelMedium, {
	base: {
		color: theme.colors.onSurfaceVariant,
	},
})

const Spinbox = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.colors.secondaryContainer,
		borderRadius: 12,
		paddingInline: 16,
		paddingBlock: 8,
		gap: 16,
	},
})

const IngredientItem = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		gap: 16,
		alignItems: 'center',
	},
})

const IngredientIcon = styled(Icon, {
	base: {
		width: 48,
		height: 48,
		borderRadius: 12,
		padding: 12,
		backgroundColor: theme.colors.secondaryContainer,
		color: theme.colors.onPrimaryContainer,
	},
})

const Grammage = styled('span', {
	base: {
		fontWeight: 'bold',
	},
})

const IngredientsList = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
