import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import { theme } from 'lib/styles'
import { type ComponentProps, type FunctionComponent } from 'react'
import { NavigationSegment, type NavigationSegmentProps } from './NavigationSegment'

type NavigationBarProps = {
	segments: Array<NavigationSegmentProps>
}

export const NavigationBar: FunctionComponent<NavigationBarProps & ComponentProps<typeof NavigationBarBase>> = ({
	segments,
	...props
}) => (
	<NavigationBarBase
		asChild
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
)

const NavigationBarBase = styled(RovingFocusGroup.Root, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingInline: 8,
		backgroundColor: theme.colors.surfaceContainer,
		width: '100%',
	},
})
