import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useQuery } from '@tanstack/react-query'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypedParams } from 'react-router-typesafe-routes/dom'
import { Gallery } from 'features/recipes/components/Gallery'
import { IngredientsSection } from 'features/recipes/components/IngredientsSection'
import { type InsightItem, RecipeInsights } from 'features/recipes/components/RecipeInsights'
import { StepsSection } from 'features/recipes/components/StepsSection'
import { recipeQuery, useDeleteRecipe } from 'features/recipes/recipes'
import { Button } from 'lib/components/Button'
import { Chip } from 'lib/components/Chip'
import { SimpleDialog } from 'lib/components/Dialog'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { IconButton } from 'lib/components/IconButton'
import { Menu } from 'lib/components/Menu'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { useDynamicTheme, useImageColor } from 'lib/hooks'
import { useDialogState } from 'lib/hooks/useDialogState'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useNotifications } from 'lib/hooks/useNotifications'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'
import { isDefined } from 'lib/utils'

export const Recipe: FunctionComponent = () => {
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const { notify } = useNotifications()
	const { id } = useTypedParams(PATHS.RECIPES.RECIPE)
	const { data: recipe, status } = useQuery(recipeQuery(id))
	const color = useImageColor(recipe?.image)
	const styles = useDynamicTheme(color)
	const { AnimateDialog, state: [, setIsDeleteDialogOpen] } = useDialogState(false)
	const deleteRecipeMutation = useDeleteRecipe()
	const navigate = useNavigate()

	const handleShareRecipe = () => {
		navigator.share({ url: recipe?.url }).catch((error: DOMException | TypeError) => {
			error.name !== 'AbortError' && notify('There was an error while sharing recipe, try again')
		})
	}

	if (status === 'pending') {
		return 'Loading...'
	}

	if (status === 'error') {
		notify('Couldn\'t load this recipe', { id: 'recipeError' })
		navigate(-1)

		return
	}

	const prepTime: InsightItem | undefined = recipe.prepTime
		? {
			icon: 'timer',
			text: `${recipe.prepTime} hours`,
		}
		: undefined
	const calories: InsightItem | undefined = recipe.calories
		? {
			icon: 'fire',
			text: `${recipe.calories} kcal`,
		}
		: undefined
	const rating: InsightItem | undefined = recipe.rating
		? {
			icon: 'star',
			text: recipe.rating.toFixed(1),
		}
		: undefined
	const servings: InsightItem | undefined = recipe.servings
		? {
			icon: 'utensils',
			text: `${recipe.servings} servings`,
		}
		: undefined

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={recipe.name}
					elevation={isListScrolled ? 'onScroll' : 'flat'}
					style={styles}
					options={(
						<Menu.Root
							open={isMoreOpen}
							onOpenChange={setIsMoreOpen}
						>
							<Menu.Trigger asChild>
								<IconButton
									icon="more"
									title="More"
									isSelected={isMoreOpen}
								/>
							</Menu.Trigger>
							<Menu.Content open={isMoreOpen}>
								<Menu.Item
									text="Edit recipe"
									icon="pencil"
								/>
								{navigator.share !== undefined && (
									<Menu.Item
										text="Share recipe"
										icon="share"
										onClick={handleShareRecipe}
									/>
								)}
								<Menu.Item
									text="Delete recipe"
									icon="delete"
									onClick={() => setIsDeleteDialogOpen(true)}
								/>
							</Menu.Content>
						</Menu.Root>
					)}
				/>
			</HeaderPortal>
			{renderProbe}
			<ContentContainer style={styles}>
				<Cover src={recipe.image} />
				<RecipeInsights items={[prepTime, calories, rating, servings].filter(isDefined)} />
				{recipe.description && (
					<Description>
						{recipe.description}
					</Description>
				)}
				<Section>
					<Typography.TitleLarge>
						Most common tags
					</Typography.TitleLarge>
					<TagsContainer
						type="multiple"
						value={[]}
					>
						{recipe.tags.map(tag => (
							<ToggleGroup.Item
								key={tag}
								value={tag}
								asChild
							>
								<StyledChip
									text={tag}
									variant="outlined"
								/>
							</ToggleGroup.Item>
						))}
					</TagsContainer>
				</Section>
				<IngredientsSection
					ingredients={recipe.ingredients}
					initialServingsCount={recipe.servings}
				/>
				<StepsSection steps={recipe.instructions} />
				<Section>
					<Typography.TitleLarge>
						Gallery
					</Typography.TitleLarge>
					<Gallery />
				</Section>
			</ContentContainer>
			<AnimateDialog>
				<SimpleDialog
					title="Delete recipe"
					description={`Do you really want to delete recipe ${recipe.name}?`}
					onOpenChange={() => setIsDeleteDialogOpen(false)}
					actions={[
						(
							<Button
								key="cancel"
								variant="text"
								onClick={() => setIsDeleteDialogOpen(false)}
							>
								Cancel
							</Button>
						),
						(
							<Button
								key="delete"
								variant="filled"
								onClick={() => {
									deleteRecipeMutation.mutate(recipe.id, {
										onSuccess: () => navigate(-1),
									})
								}}
							>
								Delete
							</Button>
						),
					]}
				/>
			</AnimateDialog>
		</Fragment>
	)
}

const ContentContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		paddingInline: 16,
		paddingBottom: 32,
		gap: 32,
	},
})

const Cover = styled('img', {
	base: {
		width: '100%',
		height: 'auto',
		maxHeight: 200,
		objectFit: 'cover',
		borderRadius: 12,
	},
})

const Description = styled(Typography.BodyMedium, {
	base: {
		color: theme.colors.onSurface,
		textAlign: 'justify',
	},
})

const StyledChip = styled(Chip, {
	base: {
		flex: '1 0 auto',
	},
})

const TagsContainer = styled(ToggleGroup.Root, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
})

const Section = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		color: theme.colors.onBackground,
	},
})
