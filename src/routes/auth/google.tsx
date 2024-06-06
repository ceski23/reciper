import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { Google } from 'features/auth/providers'

export const Route = createFileRoute('/auth/google')({
	component: Google,
	validateSearch: search =>
		v.parse(
			v.object({
				state: v.optional(v.string()),
				scope: v.pipe(
					v.union([v.string(), v.array(v.string())]),
					v.transform(input => typeof input === 'string' ? input.split(/[\+ ]/) : input),
				),
				error: v.optional(v.string()),
			}),
			search,
		),
})
