import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
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
	<NavigationBarBase
		asChild
		ref={ref}
		{...props}
	>
		<nav>
			{segments.map(segment => (
				<NavigationSegment
					key={segment.to}
					{...segment}
				/>
			))}
		</nav>
	</NavigationBarBase>
))

const NavigationBarBase = styled(RovingFocusGroup.Root, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingInline: 8,
		backgroundColor: theme.colors.surfaceContainer,
		width: '100%',
		viewTransitionName: 'navbar',
	},
})
