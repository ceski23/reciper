import { FunctionComponent, type ComponentProps } from 'react'
import { Chip } from './Chip'
import { Toggle } from '@base-ui/react'
import { SelectedIcon } from '../icons'

type FilterChipProps = Pick<ComponentProps<typeof Chip>, 'leadingIcon' | 'variant' | 'label'> & Toggle.Props

export const Filter: FunctionComponent<FilterChipProps> = ({ label, leadingIcon, variant, ...props }) => (
	<Toggle
		{...props}
		render={(props, { pressed }) => (
			<Chip
				label={label}
				pressed={pressed}
				variant={variant}
				leadingIcon={pressed ? SelectedIcon : leadingIcon}
				{...props}
			/>
		)}
	/>
)
