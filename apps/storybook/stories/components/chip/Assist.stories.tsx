import preview from '#.storybook/preview'
import { Chip } from '@repo/ui/components/chip'
import { ImageIcon } from '#icons'

const meta = preview.meta({
	title: 'Components/Chip/Assist',
	component: Chip.Assist,
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

export const Elevated = meta.story({
	args: {
		label: 'Elevated',
		variant: 'elevated',
	},
})

export const WithLeadingIcon = meta.story({
	args: {
		label: 'With Icon',
		leadingIcon: ImageIcon,
	},
})

export const Disabled = meta.story({
	args: {
		label: 'Disabled',
		disabled: true,
	},
})
