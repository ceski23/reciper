import { vi } from 'vitest'

vi.mock(import('lib/utils/images'), async importOriginal => ({
	// TODO: make this work
	// ...await importOriginal(),
	getColorFromImage: async () => '#ffffff',
}))
