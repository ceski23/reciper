import { createSchemes } from './src/generateColors'
import fs from 'node:fs/promises'

await fs.writeFile('src/lib/styles/theme.json', JSON.stringify(createSchemes('#0088cc'), undefined, '\t'))