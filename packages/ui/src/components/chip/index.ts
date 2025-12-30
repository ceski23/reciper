import { Assist } from './Assist'
import { Filter } from './Filter'
import { Input } from './Input'
import { Suggestion } from './Suggestion'

type Chip = {
	Input: typeof Input
	Assist: typeof Assist
	Filter: typeof Filter
	Suggestion: typeof Suggestion
}

export const Chip: Chip = {
	Input,
	Assist,
	Filter,
	Suggestion,
}
