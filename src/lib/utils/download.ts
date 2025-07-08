export const downloadBlob = (fileName: string, blob: Blob) => {
	const url = URL.createObjectURL(blob)

	const tmpAnchor = document.createElement('a')
	tmpAnchor.href = url
	tmpAnchor.download = fileName
	tmpAnchor.click()

	URL.revokeObjectURL(url)
}
