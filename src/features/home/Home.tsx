import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'
import { FakeSearchBar } from './components/FakeSearchBar'

export const Home: FunctionComponent = () => (
	<Container>
		<FakeSearchBar
			leadingIcon="search"
			placeholder="What do you want to eat?"
		/>
	</Container>
)

const Container = styled('div', {
	base: {
		padding: 16,
		gap: 24,
	},
})
