import { styled } from '@macaron-css/react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { type ComponentProps, type FunctionComponent, isValidElement, type ReactElement, type ReactNode } from 'react'
import { theme } from 'lib/styles'
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
}

export const SimpleDialog: FunctionComponent<SimpleDialogProps & ComponentProps<typeof RadixDialog.Root>> = ({
	title,
	description,
	icon,
	actions,
	content,
	closeOnClickOutside = true,
	...props
}) => (
	<RadixDialog.Root {...props}>
		<Dialog.Portal>
			<DialogOverlay />
			<Dialog.Content
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

const DialogOverlay = styled(RadixDialog.Overlay, {
	base: {
		width: '100vw',
		height: '100vh',
		backgroundColor: theme.colors.scrim,
		opacity: 0.32,
		position: 'fixed',
		inset: 0,
	},
})

const DialogContent = styled(RadixDialog.Content, {
	base: {
		minWidth: 280,
		maxWidth: 560,
		display: 'grid',
		gridTemplateColumns: '24px 1fr 24px',
		gridAutoFlow: 'row',
		borderRadius: 28,
		backgroundColor: theme.colors.surfaceContainerHigh,
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		paddingBlock: 24,
		gap: 16,
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
