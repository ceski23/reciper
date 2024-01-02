import { styled } from '@macaron-css/react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { animated, type SpringValue } from '@react-spring/web'
import { type ComponentProps, type FunctionComponent, isValidElement, type ReactElement, type ReactNode } from 'react'
import { styleUtils, theme } from 'lib/styles'
import { Button } from './Button'
import { Typography } from './Typography'
import Icon, { type SvgName } from '~virtual/svg-component'

type DialogActionItem = {
	label: string
	onClick: VoidFunction
}

type SimpleDialogProps = {
	title: string
	description: string
	icon?: SvgName
	actions: Array<DialogActionItem | ReactElement>
	content?: ReactNode
	closeOnClickOutside?: boolean
	styles?: {
		opacity: SpringValue<number>
	}
}

export const SimpleDialog: FunctionComponent<SimpleDialogProps & ComponentProps<typeof RadixDialog.Root>> = ({
	title,
	description,
	icon,
	actions,
	content,
	closeOnClickOutside = true,
	styles,
	...props
}) => (
	<RadixDialog.Root {...props}>
		<Dialog.Portal>
			<DialogOverlay style={{ opacity: styles?.opacity }} />
			<Dialog.Content
				style={styles}
				variant={icon ? 'withIcon' : 'simple'}
				onInteractOutside={event => {
					if (!closeOnClickOutside) {
						event.preventDefault()
					}
				}}
			>
				{icon && <DialogIcon name={icon} />}
				<Dialog.Title asChild>
					<Title>
						{title}
					</Title>
				</Dialog.Title>
				<Dialog.Description asChild>
					<Description>
						{description}
					</Description>
				</Dialog.Description>
				{content && <DialogExtraContent>{content}</DialogExtraContent>}
				<Dialog.Actions>
					{actions.map(action =>
						isValidElement(action) ? action : 'label' in action
							? (
								<Button
									key={action.label}
									onClick={action.onClick}
									type="button"
									variant="text"
								>
									{action.label}
								</Button>
							)
							: null
					)}
				</Dialog.Actions>
			</Dialog.Content>
		</Dialog.Portal>
	</RadixDialog.Root>
)

const DialogOverlay = styled(animated(RadixDialog.Overlay), {
	base: {
		width: '100vw',
		height: '100vh',
		backgroundColor: styleUtils.transparentize(theme.colors.scrim, 0.32),
		position: 'fixed',
		inset: 0,
	},
})

const DialogContent = styled(animated(RadixDialog.Content), {
	base: {
		minWidth: 280,
		maxWidth: 560,
		width: '80%',
		display: 'grid',
		gridTemplateColumns: '24px 1fr 24px',
		gridAutoFlow: 'row',
		borderRadius: 28,
		backgroundColor: theme.colors.surfaceContainerHigh,
		color: theme.colors.onSurface,
		position: 'fixed',
		top: '50%',
		left: '50%',
		translate: '-50% -50%',
		paddingBlock: 24,
		rowGap: 16,
	},
	variants: {
		variant: {
			simple: {},
			withIcon: {
				justifyItems: 'center',
			},
		},
	},
})

const DialogActions = styled('div', {
	base: {
		display: 'flex',
		gap: 8,
		marginLeft: 'auto',
		paddingTop: 8,
		gridColumn: 2,
	},
})

const DialogIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
		color: theme.colors.secondary,
		gridColumn: 2,
	},
})

const DialogExtraContent = styled('div', {
	base: {
		paddingTop: 8,
		width: '100%',
		gridColumn: '1 / -1',
	},
})

const Title = styled(Typography.HeadlineSmall, {
	base: {
		gridColumn: 2,
	},
})

const Description = styled(Typography.BodyMedium, {
	base: {
		gridColumn: 2,
		width: '100%',
	},
})

export const Dialog = {
	Root: RadixDialog.Root,
	Trigger: RadixDialog.Trigger,
	Portal: RadixDialog.Portal,
	Overlay: DialogOverlay,
	Content: DialogContent,
	Title: RadixDialog.Title,
	Description: RadixDialog.Description,
	Actions: DialogActions,
}
