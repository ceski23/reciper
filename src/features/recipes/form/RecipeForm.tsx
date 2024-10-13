import { Composite, CompositeItem, CompositeProvider } from '@ariakit/react'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AddTagDialog } from 'features/recipes/form/AddTagDialog'
import { IngredientsFields } from 'features/recipes/form/IngredientsFields'
import { InstructionsFields } from 'features/recipes/form/InstructionsFields'
import { recipeFormSchema, type RecipeFormValues } from 'features/recipes/form/scheme'
import { Button } from 'lib/components2/Button'
import { Chip } from 'lib/components2/Chip'
import { TextField } from 'lib/components2/form/TextField'
import { IconButton } from 'lib/components2/IconButton'
import { Typography } from 'lib/components2/Typography'
import { theme } from 'lib/styles/theme'

type RecipeFormProps = {
	id?: string
	initialValues?: RecipeFormValues
	onSubmit: (values: RecipeFormValues) => void
}

export const RecipeForm: FunctionComponent<RecipeFormProps> = ({ onSubmit, id, initialValues }) => {
	const { t } = useTranslation()
	const [isAddTagDialogOpen, setIsAddTagDialogOpen] = useState(false)
	const { handleSubmit, control, formState: { errors }, watch } = useForm<RecipeFormValues>({
		resolver: valibotResolver(recipeFormSchema()),
		defaultValues: initialValues,
	})
	const ingredientsFields = useFieldArray({
		control,
		name: 'ingredients',
	})
	const instructionsFields = useFieldArray({
		control,
		name: 'instructions',
	})
	const tagsFields = useFieldArray({
		control,
		name: 'tags',
	})
	const prepTime = watch('prepTime')

	return (
		<Form
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			id={id}
		>
			<FormSection>
				<TextField
					label={t('newRecipe.fields.cover')}
					leadingIcon="image"
					name="image"
					control={control}
				/>
				<TextField
					label={t('newRecipe.fields.name')}
					name="name"
					required
					control={control}
				/>
				<TextField
					label={t('newRecipe.fields.description')}
					name="description"
					control={control}
				/>
				<TextField
					label={t('newRecipe.fields.url')}
					leadingIcon="link"
					name="url"
					control={control}
				/>
				<TextField
					label={t('newRecipe.fields.rating.label')}
					leadingIcon="star"
					name="rating"
					control={control}
				/>
				<TextField
					label={t('newRecipe.fields.prepTime.label')}
					trailingAddon={t('newRecipe.fields.prepTime.unit', { count: Number(prepTime ?? 0) })}
					name="prepTime"
					control={control}
				/>
				<Horizontal>
					<TextField
						label={t('newRecipe.fields.servings')}
						name="servings"
						control={control}
					/>
					<TextField
						label={t('newRecipe.fields.calories')}
						trailingAddon="kcal"
						name="calories"
						control={control}
					/>
				</Horizontal>
			</FormSection>
			<FormSection>
				<Typography.TitleMedium>
					{t('newRecipe.fields.tags.title')}
				</Typography.TitleMedium>
				{tagsFields.fields.length > 0 && (
					<CompositeProvider>
						<TagsContainer>
							{tagsFields.fields.map((field, index) => (
								<CompositeItem
									key={field.id}
									render={(
										<Tag
											text={field.text}
											variant="outlined"
											onClose={() => tagsFields.remove(index)}
										/>
									)}
								/>
							))}
						</TagsContainer>
					</CompositeProvider>
				)}
				<AddButton
					leftIcon="plus"
					type="button"
					onClick={() => setIsAddTagDialogOpen(true)}
				>
					{t('newRecipe.fields.tags.addTag')}
				</AddButton>
				<AddTagDialog
					open={isAddTagDialogOpen}
					onClose={() => setIsAddTagDialogOpen(false)}
					onAddTag={text => {
						tagsFields.append({ text })
						setIsAddTagDialogOpen(false)
					}}
				/>
			</FormSection>
			<FormSection>
				<div>
					<Typography.TitleMedium>
						{t('newRecipe.fields.ingredients.title')}
					</Typography.TitleMedium>
					{errors.ingredients?.message && (
						<ErrorText>
							{errors.ingredients.message}
						</ErrorText>
					)}
				</div>
				{ingredientsFields.fields.map((field, index) => (
					<Fragment key={field.id}>
						<TextField
							label={t('newRecipe.fields.ingredients.group.group', { index: index + 1 })}
							name={`ingredients.${index}.group`}
							control={control}
							trailingAddon={(
								<DeleteButton
									icon="delete"
									title={t('newRecipe.fields.ingredients.group.delete')}
									onClick={() => ingredientsFields.remove(index)}
								/>
							)}
						/>
						<GroupContainer>
							<VerticalLine />
							<IngredientsFields
								groupIndex={index}
								control={control}
							/>
						</GroupContainer>
					</Fragment>
				))}
				<AddButton
					type="button"
					leftIcon="plus"
					onClick={() =>
						ingredientsFields.append({
							group: null,
							items: [
								{ text: '' },
							],
						})}
				>
					{t('newRecipe.fields.ingredients.group.add')}
				</AddButton>
			</FormSection>
			<FormSection>
				<div>
					<Typography.TitleMedium>
						{t('newRecipe.fields.steps.title')}
					</Typography.TitleMedium>
					{errors.instructions?.message && (
						<ErrorText>
							{errors.instructions.message}
						</ErrorText>
					)}
				</div>
				{instructionsFields.fields.map((field, index) => (
					<Fragment key={field.id}>
						<TextField
							label={t('newRecipe.fields.steps.group.group', { index: index + 1 })}
							name={`instructions.${index}.group`}
							control={control}
							trailingAddon={(
								<DeleteButton
									icon="delete"
									title={t('newRecipe.fields.steps.group.delete')}
									onClick={() => instructionsFields.remove(index)}
								/>
							)}
						/>
						<GroupContainer>
							<VerticalLine />
							<InstructionsFields
								groupIndex={index}
								control={control}
							/>
						</GroupContainer>
					</Fragment>
				))}
				<AddButton
					type="button"
					leftIcon="plus"
					onClick={() =>
						instructionsFields.append({
							group: null,
							items: [
								{ text: '' },
							],
						})}
				>
					{t('newRecipe.fields.steps.group.add')}
				</AddButton>
			</FormSection>
		</Form>
	)
}

const Form = styled('form', {
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

const TagsContainer = styled(Composite, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
})

const Tag = styled(Chip, {
	base: {
		flex: '1 0 auto',
		textDecoration: 'unset',
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

const ErrorText = styled(Typography.BodySmall, {
	base: {
		color: theme.colors.error,
		marginTop: 8,
	},
})

const GroupContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
	},
})

const VerticalLine = styled('div', {
	base: {
		width: 3,
		height: 'calc(100% - 32px)',
		backgroundColor: theme.colors.primary,
		borderRadius: '9999px 9999px 0 0',
		marginLeft: 16,
		marginRight: 24,
		marginBottom: 32,
		position: 'relative',
		'::after': {
			content: '""',
			position: 'absolute',
			width: 9,
			height: 10,
			borderRadius: '0 9999px 0 9999px',
			bottom: -12,
			borderBottom: `3px solid ${theme.colors.primary}`,
			borderLeft: `3px solid ${theme.colors.primary}`,
		},
	},
})
