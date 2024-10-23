import { argbFromRgb, hexFromArgb, QuantizerCelebi, Score } from '@material/material-color-utilities'
import { type ColorExtractWorkerResponse } from '@utils/images'

type EventPayload = {
	url: string
	buffer: ArrayBuffer
	size: number
}

const rgbaToArgb = (src: Uint8ClampedArray) => {
	const dest = new Uint32Array(src.length / 4)

	for (let i = 0; i < src.length; i += 4) {
		dest[i / 4] = argbFromRgb(src[i], src[i + 1], src[i + 2])
	}

	return dest
}

const cache = new Map<string, string>()

globalThis.addEventListener('message', (event: MessageEvent<EventPayload>) => {
	if (cache.has(event.data.url)) {
		return globalThis.postMessage(
			{
				url: event.data.url,
				color: cache.get(event.data.url)!,
			} satisfies ColorExtractWorkerResponse,
		)
	}

	const modified = Array.from(rgbaToArgb(new Uint8ClampedArray(event.data.buffer)))
	const quantizerResult = QuantizerCelebi.quantize(modified, event.data.size)
	const [color] = Score.score(quantizerResult).map(hexFromArgb)

	globalThis.postMessage(
		{
			url: event.data.url,
			color,
		} satisfies ColorExtractWorkerResponse,
	)
})
