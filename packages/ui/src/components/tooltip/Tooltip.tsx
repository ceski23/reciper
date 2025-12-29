import { Fragment, type ReactElement } from 'react'
import {
	Tooltip as BaseTooltip,
	type TooltipPositionerProps,
	type TooltipRootProps,
	type TooltipTriggerProps,
} from '@base-ui/react/tooltip'
import { containerStyle } from './style.css'

type TooltipProps<TPayload> = TooltipRootProps<TPayload> &
	Pick<TooltipPositionerProps, 'align' | 'alignOffset' | 'side' | 'sideOffset'> &
	Pick<TooltipTriggerProps, 'closeDelay'> & {
		content: string | ((payload: TPayload) => string)
		children?: ReactElement
	}

const InternalTooltip = <TPayload,>({
	children,
	content,
	align = 'center',
	alignOffset,
	side = 'top',
	sideOffset = 4,
	closeDelay = 1500,
	...props
}: TooltipProps<TPayload>) => (
	<BaseTooltip.Root {...props}>
		{({ payload }) => (
			<Fragment>
				{children && (
					<BaseTooltip.Trigger
						render={children}
						closeDelay={closeDelay}
						id={props.triggerId ?? undefined}
					/>
				)}
				<BaseTooltip.Portal>
					<BaseTooltip.Positioner
						align={align}
						alignOffset={alignOffset}
						side={side}
						sideOffset={sideOffset}
					>
						<BaseTooltip.Popup className={containerStyle()}>
							{typeof content !== 'function' ? content : payload !== undefined ? content(payload) : null}
						</BaseTooltip.Popup>
					</BaseTooltip.Positioner>
				</BaseTooltip.Portal>
			</Fragment>
		)}
	</BaseTooltip.Root>
)

export const Tooltip = Object.assign(InternalTooltip, {
	Provider: BaseTooltip.Provider,
	Trigger: BaseTooltip.Trigger,
	createHandle: BaseTooltip.createHandle,
})
