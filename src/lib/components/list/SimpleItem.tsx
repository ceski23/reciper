import * as Ariakit from '@ariakit/react'
import { Ripples } from '@components/Ripples'
import { type ComponentProps, type ReactNode } from 'react'
import { ListItemContainer } from './ListItemContainer'
import { ListItemContent, type ListItemContentProps } from './ListItemContent'

type SimpleItemProps = {
	trailingElement?: ReactNode
	onClick?: VoidFunction
	isDisabled?: boolean
}

export const SimpleItem = ({
	title,
	text,
	leadingElement,
	iconColor,
	trailingElement,
	overline,
	isDisabled,
	render,
	variant,
	...props
}: ComponentProps<typeof ListItemContainer> & SimpleItemProps & Omit<ListItemContentProps, 'hasWrappedText'>) => {
	const isClickable = variant === 'clickable' || props.onClick

	return (
		<ListItemContainer
			aria-label={title}
			variant={isDisabled ? 'disabled' : (isClickable ? 'clickable' : 'nonClickable')}
			render={isClickable
				? (
					<Ripples
						render={(
							<Ariakit.CompositeItem
								disabled={isDisabled}
								render={render}
							/>
						)}
					/>
				)
				: render}
			{...props}
		>
			<ListItemContent
				overline={overline}
				title={title}
				text={text}
				leadingElement={leadingElement}
				iconColor={iconColor}
				hasWrappedText={props.size === '3line'}
			/>
			{trailingElement}
		</ListItemContainer>
	)
}
