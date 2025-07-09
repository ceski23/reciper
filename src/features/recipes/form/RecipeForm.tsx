import { Composite, CompositeItem, CompositeProvider } from '@ariakit/react'
import { NumberField } from '@components/form/NumberField'
import { TextAreaField } from '@components/form/TextAreaField'
import { Icon } from '@components/Icon'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { styled } from '@macaron-css/react'
import { type MaskitoOptions, type MaskitoPostprocessor } from '@maskito/core'
import { maskitoPrefixPostprocessorGenerator } from '@maskito/kit'
import { mq } from '@styles/utils'
import { generateThumbhash, getColorFromImage } from '@utils/images'
import { Fragment, type FunctionComponent, Suspense, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNotifications } from 'features/notifications'
import { AddTagDialog } from 'features/recipes/form/AddTagDialog'
import { ColorPicker } from 'features/recipes/form/ColorPicker'
import { IngredientsFields } from 'features/recipes/form/IngredientsFields'
import { InstructionsFields } from 'features/recipes/form/InstructionsFields'
import { recipeFormSchema, type RecipeFormValues } from 'features/recipes/form/scheme'
import { Button } from 'lib/components/Button'
import { Chip } from 'lib/components/Chip'
import { TextField } from 'lib/components/form/TextField'
import { IconButton } from 'lib/components/IconButton'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles/theme'
import ImagePreview from './ImagePreview'

type RecipeFormProps = {
	id?: string
	initialValues?: RecipeFormValues
	onSubmit: (values: RecipeFormValues) => void
}

const lowerCasePostprocessor: MaskitoPostprocessor = ({ value, selection }) => {
	return {
		value: value.toLowerCase(),
		selection,
	}
}

const hexColorMask: MaskitoOptions = {
	mask: /^#[0-9a-fA-F]{0,6}$/,
	postprocessors: [
		maskitoPrefixPostprocessorGenerator('#'),
		lowerCasePostprocessor,
	],
}

export const RecipeForm: FunctionComponent<RecipeFormProps> = ({ onSubmit, id, initialValues }) => {
	const { t } = useTranslation()
	const [isAddTagDialogOpen, setIsAddTagDialogOpen] = useState(false)
	const notifications = useNotifications()
	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		trigger,
		setValue,
		watch,
	} = useForm<RecipeFormValues>({
		resolver: valibotResolver(recipeFormSchema()),
		defaultValues: initialValues ?? {
			name: undefined,
			image: null,
			calories: null,
			color: null,
			description: null,
			gallery: [],
			ingredients: [],
			instructions: [],
			prepTime: null,
			rating: null,
			servings: null,
			tags: [],
			url: null,
			thumbhash: null,
		},
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
	const [previewUrl, setPreviewUrl] = useState<string | null>(getValues('image'))

	const handleColorExtraction = async () => {
		const image = getValues('image')
		try {
			const color = await getColorFromImage(image ?? undefined)

			color && setValue('color', color)
		} catch (error) {
			notifications.notify('Could not extract color from image', { duration: Number.POSITIVE_INFINITY })
		}
	}

	const handleCoverFieldBlur = async () => {
		const isValid = await trigger('image')
		const imageUrl = getValues('image')

		setPreviewUrl(isValid ? imageUrl : null)

		if (!isValid || !imageUrl) return

		setValue('thumbhash', await generateThumbhash(imageUrl))
	}

	return (
		<Form
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			id={id}
		>
			<Column>
				<FormSection>
					<Typography.TitleMedium>
						{t('newRecipe.fields.basicInfo')}
					</Typography.TitleMedium>
					<TextField
						label={t('newRecipe.fields.name')}
						name="name"
						required
						control={control}
					/>
					<TextField
						label={t('newRecipe.fields.cover')}
						name="image"
						control={control}
						leadingIcon={previewUrl && errors.image === undefined
							? (
								<Suspense fallback={<FallbackIcon name="image" />}>
									<ImagePreview image={previewUrl} />
								</Suspense>
							)
							: 'image'}
						inputProps={{ onBlur: handleCoverFieldBlur }}
						onValueChange={value => value === '' && setPreviewUrl(null)}
					/>
					<TextField
						label={t('newRecipe.fields.color.label')}
						name="color"
						control={control}
						mask={hexColorMask}
						leadingIcon={<ColorPicker control={control} />}
						trailingAddon={previewUrl
							? (
								<IconButton
									title={t('newRecipe.fields.color.extract')}
									icon="colorize"
									onClick={handleColorExtraction}
								/>
							)
							: undefined}
					/>
					<TextAreaField
						label={t('newRecipe.fields.description')}
						name="description"
						control={control}
						textAreaProps={{ rows: 4 }}
					/>
					<TextField
						label={t('newRecipe.fields.url')}
						leadingIcon="link"
						name="url"
						control={control}
					/>
					<NumberField
						label={t('newRecipe.fields.rating.label')}
						leadingIcon="star"
						name="rating"
						control={control}
						min={0}
						max={5}
					/>
					<NumberField
						label={t('newRecipe.fields.prepTime.label')}
						trailingAddon={t('newRecipe.fields.prepTime.unit', { count: watch('prepTime') ?? 0 })}
						name="prepTime"
						control={control}
						min={0}
					/>
					<Horizontal>
						<NumberField
							label={t('newRecipe.fields.servings')}
							name="servings"
							control={control}
							min={0}
						/>
						<NumberField
							label={t('newRecipe.fields.calories')}
							trailingAddon="kcal"
							name="calories"
							control={control}
							min={0}
							precision={0}
						/>
					</Horizontal>
				</FormSection>
				<FormSection>
					<div>
						<Typography.TitleMedium>
							{t('newRecipe.fields.tags.title')}
						</Typography.TitleMedium>
						{errors.tags?.message && (
							<ErrorText>
								{errors.tags.message}
							</ErrorText>
						)}
					</div>
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
			</Column>
			<Column>
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
			</Column>
		</Form>
	)
}

const Form = styled('form', {
	base: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		paddingBlock: 24,
		paddingInline: 16,
		paddingBottom: 96,
		gap: 32,
		'@media': {
			[mq.atLeast('md')]: {
				paddingInline: 0,
				gridTemplateColumns: '1fr 1fr',
			},
		},
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

const Column = styled('div', {
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
		':last-child': {
			flexGrow: 0,
		},
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

const FallbackIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
	},
})
