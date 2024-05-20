/**
 * Fast hashing function. Based on: https://stackoverflow.com/a/52171480
 */
export const cyrb53 = (data: string, seed = 0) => {
	let h1 = 0xdeadbeef ^ seed
	let h2 = 0x41c6ce57 ^ seed

	for (let i = 0, ch; i < data.length; i++) {
		ch = data.charCodeAt(i)
		h1 = Math.imul(h1 ^ ch, 2654435761)
		h2 = Math.imul(h2 ^ ch, 1597334677)
	}

	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)

	const s1 = (h2 >>> 0).toString(16).padStart(8, '0')
	const s2 = (h1 >>> 0).toString(16).padStart(8, '0')

	return s1 + s2
}
