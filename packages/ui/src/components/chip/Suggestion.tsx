import { FunctionComponent, type ComponentProps } from 'react'
import { Chip } from './Chip'
import { Toggle } from '@base-ui/react'

type SuggestionChipProps = Omit<ComponentProps<typeof Chip>, 'trailingIcon'> & Toggle.Props

export const Suggestion: FunctionComponent<SuggestionChipProps> = props => <Chip {...props} />
