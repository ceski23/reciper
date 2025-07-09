import { type CSSProperties, type Ref } from 'react'
import sprite, { type SvgSpriteIconName } from 'virtual:svg-sprite'

type IconProps = {
	size?: number
	name: SvgSpriteIconName
	className?: string
	style?: CSSProperties
	ref?: Ref<SVGSVGElement>
}

export const Icon = ({ name, size, className, style, ref }: IconProps) => (
	<svg
		ref={ref}
		width={size}
		height={size}
		className={className}
		style={style}
	>
		<use xlinkHref={`${sprite}#${name}`} />
	</svg>
)
