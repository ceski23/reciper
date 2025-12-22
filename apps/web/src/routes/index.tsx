import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@repo/database'
import { todos } from '@repo/database/schema'
import { Button } from '@repo/ui/components/button'
import { Box, Stack } from '@repo/ui/components/utils'
import { env } from '#env'
import { sprinkles } from '@repo/ui/sprinkles'

const getTodos = createServerFn({ method: 'GET' }).handler(async () => {
	return db.query.todos.findMany()
})

const addRandomTodo = createServerFn({ method: 'POST' }).handler(async () => {
	await db.insert(todos).values({
		title: Math.random().toString(36).substring(7),
	})

	return { success: true }
})

const todosQueryOptions = queryOptions({
	queryKey: ['todos'],
	queryFn: getTodos,
})

const RouteComponent = () => {
	const queryClient = useQueryClient()
	const { data: todos, refetch } = useSuspenseQuery(todosQueryOptions)
	const addRandomTodoMutation = useMutation({
		mutationFn: addRandomTodo,
		onSuccess: async () => queryClient.invalidateQueries(todosQueryOptions),
	})

	return (
		<div>
			<p>{env.VITE_APP_TITLE}</p>
			<Stack gap={20}>
				<Button
					onClick={() => refetch()}
					variant="elevated"
				>
					Refresh
				</Button>
				<Button
					variant="filled"
					onClick={() => addRandomTodoMutation.mutate({})}
				>
					Add random
				</Button>
				<div className={sprinkles({ ml: 52 })}>dawd</div>
				<input type="text" />
			</Stack>
			<Box
				as="button"
				type="button"
				display="flex"
				px={36}
			>
				Wow!
			</Box>
			<div>Hello "/"! There are {todos.length} todos</div>
			<ul>
				{todos.map(todo => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	)
}

export const Route = createFileRoute('/')({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(todosQueryOptions)
	},
})
