import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { Google } from 'features/auth/providers'

export const Route = createFileRoute('/auth/google')({
	component: Google,
	validateSearch: search =>
		v.parse(
			v.object({
				state: v.optional(v.string()),
				scope: v.coerce(v.array(v.string()), input => typeof input === 'string' ? input.split(/[\+ ]/) : input),
				error: v.optional(v.string()),
			}),
			search,
		),
})
