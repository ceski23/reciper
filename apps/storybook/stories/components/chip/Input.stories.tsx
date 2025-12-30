import preview from '#.storybook/preview'
import { Chip } from '@repo/ui/components/chip'
import { ImageIcon } from '#icons'

const meta = preview.meta({
	title: 'Components/Chip/Input',
	component: Chip.Input,
	argTypes: {
		disabled: {
			control: { type: 'boolean' },
		},
		leadingIcon: {
			control: { type: 'select' },
			options: [undefined, 'ImageIcon'],
			mapping: {
				undefined: undefined,
				ImageIcon: ImageIcon,
			},
		},
		render: { control: false },
		className: { control: false },
	},
	args: {
		label: 'Chip',
	},
})

export const Default = meta.story()

export const WithLeadingIcon = meta.story({
	args: {
		label: 'With Icon',
		leadingIcon: ImageIcon,
	},
})

export const Deletable = meta.story({
	args: {
		label: 'Deletable',
		withCloseIcon: true,
	},
})

export const DeletableWithIcon = meta.story({
	args: {
		label: 'Both Icons',
		leadingIcon: ImageIcon,
		withCloseIcon: true,
	},
})

export const Disabled = meta.story({
	args: {
		label: 'Disabled',
		disabled: true,
	},
})
