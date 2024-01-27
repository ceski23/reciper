import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'
import { type SvgSpriteIconName } from 'virtual:svg-sprite'
import { Icon } from 'lib/components/Icon'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export type InsightItem = {
	text: string
	icon: SvgSpriteIconName
}

type RecipeInsightsProps = {
	items: Array<InsightItem>
}

export const RecipeInsights: FunctionComponent<RecipeInsightsProps> = ({ items }) => (
	<Container items={items.length < 3 ? 'few' : 'many'}>
		{items.map(item => (
			<Item key={item.text}>
				<StyledIcon name={item.icon} />
				<Text>{item.text}</Text>
			</Item>
		))}
	</Container>
)

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: theme.colors.surfaceContainerHigh,
		borderRadius: 12,
		paddingBlock: 16,
		paddingInline: 32,
	},
	variants: {
		items: {
			few: {
				justifyContent: 'space-evenly',
			},
			many: {
				justifyContent: 'space-between',
			},
		},
	},
})

const Item = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 8,
	},
})

const StyledIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
		color: theme.colors.primary,
	},
})

const Text = styled(Typography.LabelLarge, {
	base: {
		color: theme.colors.onSecondaryContainer,
	},
})
