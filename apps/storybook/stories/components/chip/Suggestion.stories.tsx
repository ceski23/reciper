import preview from '#.storybook/preview'
import { Chip } from '@repo/ui/components/chip'
import { ImageIcon } from '#icons'

const meta = preview.meta({
	title: 'Components/Chip/Suggestion',
	component: Chip.Suggestion,
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

export const Elevated = meta.story({
	args: {
		label: 'Elevated',
		variant: 'elevated',
	},
})

export const Disabled = meta.story({
	args: {
		label: 'Disabled',
		disabled: true,
		pressed: true,
	},
})

export const Pressed = meta.story({
	args: {
		label: 'Pressed',
		pressed: true,
	},
})
