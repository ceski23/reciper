import { styled } from '@macaron-css/react'
import { type FunctionComponent, useState } from 'react'
import { styleUtils, theme } from 'lib/styles'
import { celsiusToFahrenheit, fahrenheitToCelsius } from 'lib/utils/temperature'

type TemperatureSegmentProps = {
	match: RegExpMatchArray
}

export const TemperatureSegment: FunctionComponent<TemperatureSegmentProps> = ({ match }) => {
	const [isConvertedValueShown, setIsConvertedValueShown] = useState(false)

	const temperature = match.groups?.temp ? Number(match.groups.temp) : 0
	const convertedTemperature = match.groups?.unit === 'F'
		? fahrenheitToCelsius(temperature)
		: celsiusToFahrenheit(temperature)
	const convertedUnit = match.groups?.unit === 'F' ? 'C' : 'F'

	return (
		<Temperature
			onClick={event => {
				event.stopPropagation()
				setIsConvertedValueShown(prev => !prev)
			}}
			onPointerDown={event => event.stopPropagation()}
			onKeyDown={event => event.stopPropagation()}
		>
			{isConvertedValueShown
				? `${convertedTemperature}°${convertedUnit}`
				: `${match.groups?.temp}°${match.groups?.unit}`}
		</Temperature>
	)
}

const Temperature = styled('span', {
	base: {
		fontWeight: 600,
		color: theme.colors.primary,
		backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
		paddingInline: 4,
		paddingBlock: 2,
		borderRadius: 4,
	},
})
