export const isValidUrl = (url?: string): url is string => {
	if (!url) return false

	try {
		return new URL(url) !== undefined
	} catch (error) {
		return false
	}
}
