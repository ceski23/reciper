import { styled } from '@macaron-css/react'
import mergeProps from 'merge-props'
import { type ComponentProps, type FunctionComponent } from 'react'
import { Link, type To } from 'react-router-dom'
import { useRipples } from 'lib/hooks/useRipples'
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
}) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<ListItemBase
			variant="clickable"
			aria-label={title}
			asChild
			{...mergeProps(props, eventHandlers)}
		>
			<Container to={to}>
				{renderRipples}
				<MainContent
					title={title}
					text={text}
					leadingElement={leadingElement}
					iconColor={iconColor}
					hasWrappedText={props.size === '3line'}
				/>
			</Container>
		</ListItemBase>
	)
}

const Container = styled(Link, {
	base: {
		position: 'relative',
	},
})
