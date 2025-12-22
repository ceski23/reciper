import { FunctionComponent, type RefObject } from 'react'
import * as styles from './style.css'

type RippleContainerProps = {
	containerRef: RefObject<HTMLSpanElement | null>
}

export const RippleContainer: FunctionComponent<RippleContainerProps> = ({ containerRef }) => (
	<span
		ref={containerRef}
		className={styles.rippleContainer}
	/>
)
