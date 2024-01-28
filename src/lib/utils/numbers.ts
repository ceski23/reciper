export const parseValidNumber = (text?: string | null) => {
	const number = Number.parseInt(text ?? '', 10)

	return Number.isNaN(number) ? undefined : number
}
