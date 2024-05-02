import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'lib/components/Button'
import { Chip } from 'lib/components/Chip'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { IconButton } from 'lib/components/IconButton'
import { TextField } from 'lib/components/TextField'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'

export const NewRecipe: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isContentScrolled, setIsContentScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsContentScrolled)

	return (
		<Fragment>
			{renderProbe}
			<TopAppBar
				configuration="small"
				title={t('newRecipe.title')}
				onBackClick={() => history.length > 1 ? history.back() : window.close()}
			/>
			<Container>
				<FormSection>
					<TextField
						label={t('newRecipe.fields.cover')}
						leadingIcon="image"
						value=""
					/>
					<TextField
						label={t('newRecipe.fields.name')}
						value="Sunday chicken soup"
					/>
					<TextField
						label={t('newRecipe.fields.description')}
						value=""
					/>
					<TextField
						label={t('newRecipe.fields.url')}
						leadingIcon="link"
						value=""
					/>
					<TextField
						label={t('newRecipe.fields.prepTime.label')}
						value="10"
						trailingAddon={t('newRecipe.fields.prepTime.unit', { count: 10 })}
					/>
					<Horizontal>
						<TextField
							label={t('newRecipe.fields.servings')}
							value="7"
						/>
						<TextField
							label={t('newRecipe.fields.calories')}
							value="1500"
							trailingAddon="kcal"
						/>
					</Horizontal>
				</FormSection>
				<FormSection>
					<Typography.TitleMedium>
						{t('newRecipe.fields.tags.title')}
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
					<AddButton leftIcon="plus">{t('newRecipe.fields.tags.addTag')}</AddButton>
				</FormSection>
				<FormSection>
					<Typography.TitleMedium>
						{t('newRecipe.fields.ingredients.title')}
					</Typography.TitleMedium>
					<TextField
						label={t('newRecipe.fields.ingredients.ingredient', { index: 1 })}
						value="2 cups of milk"
						trailingAddon={(
							<DeleteButton
								icon="delete"
								title={t('newRecipe.fields.ingredients.delete')}
							/>
						)}
					/>
					<AddButton leftIcon="plus">{t('newRecipe.fields.ingredients.add')}</AddButton>
				</FormSection>
				<FormSection>
					<Typography.TitleMedium>
						{t('newRecipe.fields.steps.title')}
					</Typography.TitleMedium>
					<TextField
						label={t('newRecipe.fields.steps.step', { index: 1 })}
						value="Put ingredients inside bowl"
						trailingAddon={(
							<DeleteButton
								icon="delete"
								title={t('newRecipe.fields.steps.delete')}
							/>
						)}
					/>
					<AddButton leftIcon="plus">{t('newRecipe.fields.steps.add')}</AddButton>
				</FormSection>
			</Container>
			<ContentOverlayPortal>
				<FabContainer>
					<FloatingActionButton
						icon="save"
						label={t('newRecipe.fields.save')}
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
