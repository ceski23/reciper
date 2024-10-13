import { Composite, CompositeItem, CompositeProvider } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { type ComponentProps, forwardRef } from 'react'
import { theme } from 'lib/styles'
import { NavigationSegment, type NavigationSegmentProps } from './NavigationSegment'

type NavigationBarProps = {
	segments: Array<NavigationSegmentProps>
}

export const NavigationBar = forwardRef<HTMLDivElement, NavigationBarProps & ComponentProps<typeof NavigationBarBase>>(({
	segments,
	...props
}, ref) => (
	<CompositeProvider>
		<NavigationBarBase
			ref={ref}
			{...props}
			render={(
				<nav>
					{segments.map(segment => (
						<CompositeItem
							key={segment.to}
							render={(
								<NavigationSegment
									{...segment}
								/>
							)}
						/>
					))}
				</nav>
			)}
		/>
	</CompositeProvider>
))

const NavigationBarBase = styled(Composite, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingInline: 8,
		backgroundColor: theme.colors.surfaceContainer,
		width: '100%',
		viewTransitionName: 'navbar',
		position: 'fixed',
		bottom: 0,
	},
})
