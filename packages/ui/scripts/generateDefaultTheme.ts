import { generateTheme } from '../src/generator'

const theme = generateTheme('#0088cc')
const json = JSON.stringify(theme, null, '\t')

const destination = new URL('../src/theme.json', import.meta.url)
console.log('Generating default theme in', destination.pathname)

await Bun.write(destination, json)
