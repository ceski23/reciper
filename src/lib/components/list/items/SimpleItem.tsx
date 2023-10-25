import { styled } from '@macaron-css/react'
import mergeProps from 'merge-props'
import { type ComponentProps, forwardRef, Fragment, type ReactNode } from 'react'
import { useRipples } from 'lib/hooks/useRipples'
import { ListItemBase, MainContent, type MainContentProps } from './MainContent'

type SimpleItemProps = {
	trailingElement?: ReactNode
	onClick?: VoidFunction
}

export const SimpleItem = forwardRef<
	HTMLSpanElement,
	ComponentProps<typeof ListItemBase> & SimpleItemProps & Omit<MainContentProps, 'hasWrappedText'>
>(({
	title,
	text,
	leadingElement,
	iconColor,
	trailingElement,
	overline,
	...props
}, ref) => {
	const { eventHandlers, renderRipples } = useRipples()

	const content = (
		<Fragment>
			<MainContent
				overline={overline}
				title={title}
				text={text}
				leadingElement={leadingElement}
				iconColor={iconColor}
				hasWrappedText={props.size === '3line'}
			/>
			{trailingElement}
		</Fragment>
	)

	if (props.onClick !== undefined) {
		return (
			<ListItemBase
				variant="clickable"
				focusable
				aria-label={title}
				asChild
				ref={ref}
				{...mergeProps(props, eventHandlers)}
			>
				<Button type="button">
					{renderRipples}
					{content}
				</Button>
			</ListItemBase>
		)
	}

	return (
		<ListItemBase
			ref={ref}
			focusable={false}
			aria-label={title}
			{...props}
		>
			{content}
		</ListItemBase>
	)
})

const Button = styled('button', {
	base: {
		position: 'relative',
	},
})
