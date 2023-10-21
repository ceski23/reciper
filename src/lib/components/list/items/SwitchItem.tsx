import { styled } from '@macaron-css/react'
import * as Label from '@radix-ui/react-label'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import * as RadixSwitch from '@radix-ui/react-switch'
import { type ComponentProps, type FunctionComponent } from 'react'
import { styleUtils, theme } from 'lib/styles'
import { ListItemBase, MainContent, type MainContentProps } from './MainContent'

type SwitchItemProps = {
	// TODO: Add Switch types
}

export const SwitchItem: FunctionComponent<ComponentProps<typeof ListItemBase> & SwitchItemProps & Omit<MainContentProps, 'hasWrappedText'>> = ({
	title,
	text,
	leadingElement,
	iconColor,
	...props
}) => (
	<SwitchItemBase
		clickable
		focusable={false}
		aria-label={title}
		{...props}
		asChild
	>
		<Label.Root>
			<MainContent
				title={title}
				text={text}
				leadingElement={leadingElement}
				iconColor={iconColor}
				hasWrappedText={props.variant === '3line'}
			/>
			<RovingFocusGroup.Item asChild>
				<RadixSwitch.Root>
					<RadixSwitch.Thumb />
				</RadixSwitch.Root>
			</RovingFocusGroup.Item>
		</Label.Root>
	</SwitchItemBase>
)

const SwitchItemBase = styled(ListItemBase, {
	base: {
		':focus-within': {
			backgroundColor: styleUtils.blendWithColor(theme.colors.surface, theme.colors.onSurface, 0.12),
		},
	},
})
