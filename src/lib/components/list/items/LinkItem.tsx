import { type ComponentProps, type FunctionComponent } from 'react'
import { Link as RouterLink, type To } from 'react-router-dom'
import { ListItemBase, MainContent, type MainContentProps } from './MainContent'

type LinkItemProps = {
	to: To
}

export const LinkItem: FunctionComponent<ComponentProps<typeof ListItemBase> & LinkItemProps & Omit<MainContentProps, 'hasWrappedText'>> = ({
	title,
	text,
	leadingElement,
	iconColor,
	to,
	...props
}) => (
	<ListItemBase
		clickable
		aria-label={title}
		{...props}
		asChild
	>
		<RouterLink to={to}>
			<MainContent
				title={title}
				text={text}
				leadingElement={leadingElement}
				iconColor={iconColor}
				hasWrappedText={props.variant === '3line'}
			/>
		</RouterLink>
	</ListItemBase>
)
