import { createBox } from '@dessert-box/react'
import { sprinkles } from '../../sprinkles.css'

/**
 * A styled box component created with atomic CSS utilities.
 *
 * This component is generated using the `createBox` utility with the `sprinkles`
 * atomic CSS configuration, providing a flexible layout primitive with
 * constraint-based styling capabilities.
 */
export const Box = createBox({ atoms: sprinkles })

// @ts-expect-error needed to show proper display name in React DevTools and Storybook
Box.displayName = 'Box'
