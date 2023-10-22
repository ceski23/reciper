import { styled } from '@macaron-css/react'
import * as Label from '@radix-ui/react-label'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import { type ComponentProps, type FunctionComponent } from 'react'
import { Switch } from 'lib/components/Switch'
import { styleUtils, theme } from 'lib/styles'
import { ListItemBase, MainContent, type MainContentProps } from './MainContent'

type SwitchItemProps = {
	switchProps?: ComponentProps<typeof Switch>
}

export const SwitchItem: FunctionComponent<ComponentProps<typeof ListItemBase> & SwitchItemProps & Omit<MainContentProps, 'hasWrappedText'>> = ({
	title,
	text,
	leadingElement,
	iconColor,
	switchProps,
	...props
}) => (
	<SwitchItemBase
		variant="clickable"
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
				hasWrappedText={props.size === '3line'}
			/>
			<RovingFocusGroup.Item asChild>
				<Switch {...switchProps} />
			</RovingFocusGroup.Item>
		</Label.Root>
	</SwitchItemBase>
)

const SwitchItemBase = styled(ListItemBase, {
	base: {
		selectors: {
			'&:focus-within:has(> :focus-visible)': {
				backgroundColor: styleUtils.blendWithColor(theme.colors.surface, theme.colors.onSurface, 0.12),
			},
		},
	},
})
