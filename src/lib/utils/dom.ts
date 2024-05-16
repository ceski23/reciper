export const getTextFromNode = (startNode: Node) => {
	const _getTextFromNode = (node: Node, text: string) => {
		let finalText = text

		if (node instanceof HTMLElement) {
			if (node.tagName === 'BR') finalText += '\n'
		} else {
			const newFragment = node.textContent?.trim()

			if (![' ', '\t', '\n'].includes(text[text.length - 1])) finalText += ' '
			if (newFragment?.startsWith('.')) finalText = finalText.trimEnd()

			finalText += newFragment
		}

		for (const childNode of node.childNodes) {
			finalText = _getTextFromNode(childNode, finalText)
		}

		return finalText
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
