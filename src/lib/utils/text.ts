import type { ReactNode } from 'react'

export const segmentizeText = (
	text: string,
	matcher: RegExp,
	renderSegment: (match: RegExpMatchArray, index: number) => ReactNode,
	index = 0,
): Array<ReactNode> => {
	const match = text.match(matcher)

	if (!match?.index) {
		return [text]
	}

	return [
		text.slice(0, match.index),
		renderSegment(match, index),
		...segmentizeText(text.slice(match.index + match[0].length), matcher, renderSegment, index + 1),
	]
}
