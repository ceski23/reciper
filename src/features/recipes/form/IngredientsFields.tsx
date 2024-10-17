import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	type UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { styled } from '@macaron-css/react'
import { type FunctionComponent, useState } from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { RecipeFormValues } from 'features/recipes/form/scheme'
import { SortableContainer } from 'features/recipes/form/SortableContainer'
import { Button } from 'lib/components/Button'
import { TextField } from 'lib/components/form/TextField'
import { IconButton } from 'lib/components/IconButton'

type IngredientsFieldsProps = {
	groupIndex: number
	control: Control<RecipeFormValues>
}

export const IngredientsFields: FunctionComponent<IngredientsFieldsProps> = ({ control, groupIndex }) => {
	const { t } = useTranslation()
	const ingredientsFields = useFieldArray({
		control,
		name: `ingredients.${groupIndex}.items`,
	})
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
		useSensor(TouchSensor),
	)
	const [draggedFieldId, setDraggedFieldId] = useState<UniqueIdentifier>()

	const handleDragStart = (event: DragEndEvent) => {
		setDraggedFieldId(event.active.id)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id !== over?.id) {
			const oldIndex = ingredientsFields.fields.findIndex(field => field.id === active.id)
			const newIndex = ingredientsFields.fields.findIndex(field => field.id === over?.id)

			ingredientsFields.move(oldIndex, newIndex)
		}

		setDraggedFieldId(undefined)
	}

	const handleDragOver = (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id !== over?.id) {
			navigator.vibrate(50)
		}
	}

	return (
		<Group>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
				modifiers={[restrictToVerticalAxis]}
			>
				<SortableContext
					items={ingredientsFields.fields}
					strategy={verticalListSortingStrategy}
				>
					{ingredientsFields.fields.map((field, fieldIndex) => (
						<SortableContainer
							key={field.id}
							id={field.id}
						>
							<TextField
								label={t('newRecipe.fields.ingredients.ingredient', { index: fieldIndex + 1 })}
								name={`ingredients.${groupIndex}.items.${fieldIndex}.text`}
								control={control}
								isSelected={field.id === draggedFieldId}
								trailingAddon={(
									<DeleteButton
										icon="delete"
										title={t('newRecipe.fields.ingredients.delete')}
										onClick={() => ingredientsFields.remove(fieldIndex)}
									/>
								)}
							/>
						</SortableContainer>
					))}
				</SortableContext>
			</DndContext>
			<AddButton
				type="button"
				leftIcon="plus"
				onClick={() => ingredientsFields.append({ text: '' })}
			>
				{t('newRecipe.fields.ingredients.add')}
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
