import { Checkbox, CheckboxProvider, Composite, CompositeItem, CompositeProvider } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'
import { KNOWN_INGREDIENTS } from 'features/recipes/ingredients/ingredients'
import { Chip } from 'lib/components/Chip'

type IngredientsFilterProps = {
	selectedIngredients: Array<string>
	onSelectedIngredientsChange: (ingredients: Array<string>) => void
}

export const IngredientsFilter: FunctionComponent<IngredientsFilterProps> = ({ onSelectedIngredientsChange, selectedIngredients }) => {
	return (
		<CompositeProvider>
			<CheckboxProvider<Array<string>>
				value={selectedIngredients}
				setValue={onSelectedIngredientsChange}
			>
				<TagsContainer>
					{Object.entries(KNOWN_INGREDIENTS).map(([name, ingredient]) => (
						<CompositeItem
							key={name}
							render={(
								<Checkbox
									value={name}
									render={(
										<FilterChip
											text={ingredient.name}
											leadingIcon={selectedIngredients.includes(name) ? 'check' : undefined}
										/>
									)}
								/>
							)}
						/>
					))}
				</TagsContainer>
			</CheckboxProvider>
		</CompositeProvider>
	)
}

const TagsContainer = styled(Composite, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
})

const FilterChip = styled(Chip, {
	base: {
		flex: '1 0 auto',
		textDecoration: 'unset',
	},
})
