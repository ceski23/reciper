import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent, useState } from 'react'
import { Button } from 'lib/components/Button'
import { Chip } from 'lib/components/Chip'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { IconButton } from 'lib/components/IconButton'
import { TextField } from 'lib/components/TextField'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'

export const NewRecipe: FunctionComponent = () => {
	const [isContentScrolled, setIsContentScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsContentScrolled)

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="small"
					title="New recipe"
					elevation={isContentScrolled ? 'onScroll' : 'flat'}
				/>
			</HeaderPortal>
			{renderProbe}
			<Container>
				<FormSection>
					<TextField
						label="Cover image"
						leadingIcon="image"
						value=""
					/>
					<TextField
						label="Recipe name"
						value="Sunday chicken soup"
					/>
					<TextField
						label="Recipe description"
						value=""
					/>
					<TextField
						label="Recipe url"
						leadingIcon="link"
						value=""
					/>
					<TextField
						label="Preparation time"
						value="10"
						trailingAddon="minutes"
					/>
					<Horizontal>
						<TextField
							label="Servings"
							value="7"
						/>
						<TextField
							label="Calories"
							value="1500"
							trailingAddon="kcal"
						/>
					</Horizontal>
				</FormSection>
				<FormSection>
					<Typography.TitleMedium>
						Tags
					</Typography.TitleMedium>
					<TagsContainer>
						<Chip
							text="Dinner"
							variant="outlined"
							onClose={() => {}}
						/>
						<Chip
							text="Chicken"
							variant="outlined"
							onClose={() => {}}
						/>
						<Chip
							text="Soups"
							variant="outlined"
							onClose={() => {}}
						/>
					</TagsContainer>
					<AddButton leftIcon="plus">Add tag</AddButton>
				</FormSection>
				<FormSection>
					<Typography.TitleMedium>
						Ingredients
					</Typography.TitleMedium>
					<TextField
						label="Ingredient no. 1"
						value="2 cups of milk"
						trailingAddon={(
							<DeleteButton
								icon="delete"
								title="Delete ingredeint"
							/>
						)}
					/>
					<AddButton leftIcon="plus">Add ingredient</AddButton>
				</FormSection>
				<FormSection>
					<Typography.TitleMedium>
						Steps
					</Typography.TitleMedium>
					<TextField
						label="Step no. 1"
						value="Put ingredients inside bowl"
						trailingAddon={(
							<DeleteButton
								icon="delete"
								title="Delete step"
							/>
						)}
					/>
					<AddButton leftIcon="plus">Add step</AddButton>
				</FormSection>
			</Container>
			<ContentOverlayPortal>
				<FabContainer>
					<FloatingActionButton
						icon="save"
						label="Save recipe"
						type="button"
						variant="primary"
						size={isContentScrolled ? undefined : 'expanded'}
					/>
				</FabContainer>
			</ContentOverlayPortal>
		</Fragment>
	)
}

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		paddingBlock: 24,
		paddingInline: 16,
		paddingBottom: 96,
		gap: 32,
	},
})

const Horizontal = styled('div', {
	base: {
		display: 'flex',
		gap: 24,
		flexWrap: 'wrap',
	},
})

const FormSection = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 24,
	},
})

const TagsContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
})

const AddButton = styled(Button, {
	base: {
		width: '100%',
	},
})

const DeleteButton = styled(IconButton, {
	base: {
		marginRight: 8,
	},
})

const FabContainer = styled('div', {
	base: {
		display: 'flex',
		paddingInline: 16,
		paddingBottom: 16,
		justifyContent: 'flex-end',
	},
})
