import { useInsertionEffect } from 'react'
import type { useDynamicTheme } from 'lib/hooks/useDynamicTheme'

export const useApplyDynamicTheme = (style: ReturnType<typeof useDynamicTheme>) => {
	useInsertionEffect(() => {
		if (!style) {
			return
		}

		const styleElement = document.createElement('style')
		styleElement.textContent = `:root { ${style} }`

		const insertedNode = document.head.appendChild(styleElement)

		return () => insertedNode.remove()
	}, [style])
}
