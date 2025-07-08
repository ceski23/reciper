import { config, type UseTransitionProps } from '@react-spring/web'

export const DIALOG_ANIMATION = {
	from: { opacity: 0, y: 100 },
	enter: { opacity: 1, y: 0 },
	leave: { opacity: 0, y: 100 },
	config: config.stiff,
} satisfies UseTransitionProps
