import { type FunctionComponent } from 'react'
import { ListItem } from 'lib/components/list/items'
import { List } from 'lib/components/list/List'
import { List as List2 } from 'lib/components2/list'

export const Home: FunctionComponent = () => (
	<div style={{ display: 'flex', flexDirection: 'column' }}>
		<List>
			<ListItem.Simple title="Hello World" />
			<ListItem.Simple
				title="I am clickable"
				onClick={() => {}}
				leadingElement="account"
			/>
			<ListItem.Simple
				title="I am clickable too"
				onClick={() => {}}
				leadingElement="cookie"
			/>
			<ListItem.Link
				title="I am a link"
				to="/recipes/$id"
				leadingElement="link"
			/>
			<ListItem.Switch title="I am a switch" />
		</List>
		<List2.Root>
			<List2.SimpleItem title="Hello World" />
			<List2.SimpleItem
				title="I am clickable"
				onClick={() => {}}
				leadingElement="account"
			/>
			<List2.SimpleItem
				title="I am clickable too"
				onClick={() => {}}
				leadingElement="cookie"
			/>
			<List2.LinkItem
				title="I am a link"
				to="/recipes/$id"
				leadingElement="link"
			/>
			<List2.SwitchItem title="I am a switch" />
		</List2.Root>
	</div>
)
