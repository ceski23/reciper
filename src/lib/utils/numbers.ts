export const parseValidNumber = (text?: string | null, decimal = true): number | undefined => {
	if (text === '' || text === null || text === undefined) return undefined

	const parser = decimal ? Number.parseFloat : Number.parseInt
	const number = parser(text, 10)

	return Number.isNaN(number) ? undefined : number
}

export const getSeparator = (locale: string, separatorType: 'decimal' | 'group') => {
	return new Intl.NumberFormat(locale).formatToParts(1000.1).find(part => part.type === separatorType)!.value
}
