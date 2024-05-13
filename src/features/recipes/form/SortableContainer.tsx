import { useSortable } from '@dnd-kit/sortable'
import { styled } from '@macaron-css/react'
import React, { type FunctionComponent } from 'react'
import { Icon } from 'lib/components/Icon'
import { theme } from 'lib/styles'

type SortableContainerProps = {
	id: string
	children: React.ReactNode
}

export const SortableContainer: FunctionComponent<SortableContainerProps> = ({ id, children }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

	return (
		<Container
			ref={setNodeRef}
			style={{
				transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
				transition,
			}}
		>
			<DragHandle
				type="button"
				{...attributes}
				{...listeners}
			>
				<Icon
					name="dragHandle"
					size={24}
				/>
			</DragHandle>
			{children}
		</Container>
	)
}

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		touchAction: 'none',
	},
})

const DragHandle = styled('button', {
	base: {
		marginRight: 8,
		appearance: 'none',
		border: 'none',
		background: 'none',
		cursor: 'grab',
		color: theme.colors.onSurfaceVariant,
		':active': {
			cursor: 'grabbing',
			color: theme.colors.primary,
		},
	},
})
