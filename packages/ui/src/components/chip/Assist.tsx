import { FunctionComponent, type ComponentProps } from 'react'
import { Chip } from './Chip'

type AssistChipProps = Omit<ComponentProps<typeof Chip>, 'trailingIcon' | 'pressed'>

export const Assist: FunctionComponent<AssistChipProps> = props => <Chip {...props} />
