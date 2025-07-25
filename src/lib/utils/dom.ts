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

		return finalText.replace(/\s+/g, ' ').trim()
	}

	return _getTextFromNode(startNode, '').trim()
}

export const isElementNode = (node: Node | Element): node is Element => (
	node.nodeType === Node.ELEMENT_NODE
)

const getVarName = (variable: string) => variable.match(/var\((.*)\)/)?.[1] ?? ''

export const getVariableColorValue = (variableName: string) =>
	window
		.getComputedStyle(document.body)
		.getPropertyValue(getVarName(variableName))
