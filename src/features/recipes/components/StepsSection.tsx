import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type FunctionComponent } from 'react'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export const StepsSection: FunctionComponent = () => (
	<Container>
		<Typography.TitleLarge>
			Steps
		</Typography.TitleLarge>
		<StepsList type="multiple">
			<Item value="1">
				<Number>
					Step 1
				</Number>
				<Typography.BodyMedium>
					W garnku zagotuj dwa litry wody. Kurczaka o wadze około 1,5 kg (lub też kurę o wadze minimum 1,5 kg) umieść w garnku z wrzątkiem.
					Ponownie zagotuj wodę z kurczakiem. Po dwóch minutach wylej całą wodę. Wylewasz wówczas mętną wodę ze ściętym białkiem
					(szumowiny).
				</Typography.BodyMedium>
			</Item>
			<Item value="2">
				<Number>
					Step 2
				</Number>
				<Typography.BodyMedium>
					Dodaj też dwa listki laurowe, trzy ziarna ziela angielskiego oraz łyżeczkę ziaren czarnego pieprzu. Na koniec wlej dwa litry
					świeżej, zimnej wody.
				</Typography.BodyMedium>
			</Item>
		</StepsList>
	</Container>
)

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		color: theme.colors.onBackground,
	},
})

const StepsList = styled(ToggleGroup.Root, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})

const Item = styled(ToggleGroup.Item, {
	base: {
		border: 'none',
		textAlign: 'unset',
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		color: theme.colors.onSurface,
		borderRadius: 12,
		backgroundColor: theme.colors.surfaceContainerHighest,
		padding: 16,
		cursor: 'pointer',
		selectors: {
			'&[data-state="on"]': {
				opacity: 0.5,
				textDecoration: 'line-through',
			},
		},
	},
})

const Number = styled(Typography.LabelMedium, {
	base: {
		color: theme.colors.primary,
	},
})
