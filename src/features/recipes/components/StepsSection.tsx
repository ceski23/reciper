import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type FunctionComponent } from 'react'
import { RecipeStep } from 'features/recipes/components/RecipeStep'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export const StepsSection: FunctionComponent = () => (
	<Container>
		<Typography.TitleLarge>
			Steps
		</Typography.TitleLarge>
		<StepsList type="multiple">
			<RecipeStep number={1}>
				<Typography.BodyMedium>
					W garnku zagotuj dwa litry wody. Kurczaka o wadze około 1,5 kg (lub też kurę o wadze minimum 1,5 kg) umieść w garnku z wrzątkiem.
					Ponownie zagotuj wodę z kurczakiem. Po dwóch minutach wylej całą wodę. Wylewasz wówczas mętną wodę ze ściętym białkiem
					(szumowiny).
				</Typography.BodyMedium>
			</RecipeStep>
			<RecipeStep number={2}>
				<Typography.BodyMedium>
					Dodaj też dwa listki laurowe, trzy ziarna ziela angielskiego oraz łyżeczkę ziaren czarnego pieprzu. Na koniec wlej dwa litry
					świeżej, zimnej wody.
				</Typography.BodyMedium>
			</RecipeStep>
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
