import { vi } from 'vitest'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
vi.mock(import('lib/utils/images'), async _importOriginal => ({
	// TODO: make this work
	// ...await importOriginal(),
	getColorFromImage: async () => '#ffffff',
}))
