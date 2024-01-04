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
