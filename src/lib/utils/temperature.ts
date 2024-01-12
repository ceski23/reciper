export const fahrenheitToCelsius = (temp: number) => (temp - 32) / 1.8
export const celsiusToFahrenheit = (temp: number) => (temp * 1.8) + 32

export const TEMPERATURE_PATTERN = /(?<temp>\d+)\s?(?:°|stopni)\s?(?<unit>[CF])/
