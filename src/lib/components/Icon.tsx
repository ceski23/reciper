import { type CSSProperties, forwardRef } from 'react'
import sprite, { type SvgSpriteIconName } from 'virtual:svg-sprite'

type IconProps = {
	size?: number
	name: SvgSpriteIconName
	className?: string
	style?: CSSProperties
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, size, className, style }, ref) => (
	<svg
		ref={ref}
		width={size}
		height={size}
		className={className}
		style={style}
	>
		<use xlinkHref={`${sprite}#${name}`} />
	</svg>
))
