import { FunctionComponent, type ComponentProps } from 'react'
import { Chip } from './Chip'
import { CloseIcon } from '../icons'

type InputChipProps = Omit<ComponentProps<typeof Chip>, 'variant' | 'trailingIcon' | 'pressed'> & {
	withCloseIcon?: boolean
}

export const Input: FunctionComponent<InputChipProps> = ({ withCloseIcon, ...props }) => (
	<Chip
		variant="outlined"
		trailingIcon={withCloseIcon ? CloseIcon : undefined}
		{...props}
	/>
)
