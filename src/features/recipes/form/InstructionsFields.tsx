import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { type RecipeFormValues } from 'features/recipes/form/scheme'
import { Button } from 'lib/components/Button'
import { TextField } from 'lib/components/form/TextField'
import { IconButton } from 'lib/components/IconButton'

type InstructionsFieldsProps = {
	groupIndex: number
	control: Control<RecipeFormValues>
}

export const InstructionsFields: FunctionComponent<InstructionsFieldsProps> = ({ control, groupIndex }) => {
	const { t } = useTranslation()
	const instructionsFields = useFieldArray({
		control,
		name: `instructions.${groupIndex}.items`,
	})

	return (
		<Group>
			{instructionsFields.fields.map((field, fieldIndex) => (
				<TextField
					key={field.id}
					label={t('newRecipe.fields.steps.step', { index: fieldIndex + 1 })}
					name={`instructions.${groupIndex}.items.${fieldIndex}.text`}
					control={control}
					trailingAddon={(
						<DeleteButton
							icon="delete"
							title={t('newRecipe.fields.steps.delete')}
							onClick={() => instructionsFields.remove(fieldIndex)}
						/>
					)}
				/>
			))}
			<AddButton
				type="button"
				leftIcon="plus"
				onClick={() => instructionsFields.append({ text: '' })}
			>
				{t('newRecipe.fields.steps.add')}
			</AddButton>
		</Group>
	)
}

const DeleteButton = styled(IconButton, {
	base: {
		marginRight: 8,
	},
})

const AddButton = styled(Button, {
	base: {
		width: '100%',
	},
})

const Group = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 24,
		flex: 1,
	},
})
