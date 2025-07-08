import * as Ariakit from '@ariakit/react'
import { useState } from 'react'

export const useListSelection = () => {
	const [isSelecting, setIsSelecting] = useState(false)
	const selectionStore = Ariakit.useCheckboxStore<Array<string>>({
		defaultValue: [],
		setValue: values => setIsSelecting(values.length > 0),
	})
	const selectedItems = selectionStore.useState().value
	const resetSelection = () => {
		selectionStore.setValue([])
		setIsSelecting(false)
	}
	const startSelection = () => setIsSelecting(true)

	return {
		isSelecting,
		resetSelection,
		selectedItems,
		startSelection,
		selectionStore,
	}
}
