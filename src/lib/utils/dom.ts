export const getTextFromNode = (startNode: Node) => {
	const _getTextFromNode = (node: Node, text: string) => {
		if (node instanceof HTMLElement) {
			if (node.tagName === 'BR') text += '\n'
		} else {
			const newFragment = node.textContent?.trim()

			if (![' ', '\t', '\n'].includes(text[text.length - 1])) text += ' '
			if (newFragment?.startsWith('.')) text = text.trimEnd()

			text += newFragment
		}

		for (const childNode of node.childNodes) {
			text = _getTextFromNode(childNode, text)
		}

		return text
	}

	return _getTextFromNode(startNode, '').trim()
}

export const computeStyle = <TStyle extends keyof CSSStyleDeclaration>(style: TStyle, value: CSSStyleDeclaration[TStyle]) => {
	const tempElement = document.createElement('div')
	tempElement.style[style] = value
	document.documentElement.append(tempElement)

	const computedValue = window.getComputedStyle(tempElement)[style]
	tempElement.remove()

	return computedValue
}
