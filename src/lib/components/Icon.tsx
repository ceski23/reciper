import { type CSSProperties, forwardRef, type MouseEventHandler } from 'react'
import sprite, { type SvgSpriteIconName } from 'virtual:svg-sprite'

type IconProps = {
	size?: number
	name: SvgSpriteIconName
	className?: string
	style?: CSSProperties
	onClick?: MouseEventHandler<SVGSVGElement>
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, size, className, onClick, style }, ref) => (
	<svg
		ref={ref}
		width={size}
		height={size}
		className={className}
		style={style}
		onClick={onClick}
	>
		<use xlinkHref={`${sprite}#${name}`} />
	</svg>
))
