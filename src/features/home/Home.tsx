import { type FunctionComponent } from 'react'
import { Notification } from 'features/notifications'
import { IconButton } from 'lib/components/IconButton'
import { Snackbar } from 'lib/components/Snackbar'
import { IconButton as IconButton2 } from 'lib/components2/IconButton'

export const Home: FunctionComponent = () => {
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ padding: 16 }}>
				<IconButton
					type="button"
					icon="account"
					title="Button"
				/>
				<Snackbar
					text="lol"
					action={{
						label: 'ok',
						onClick: () => {},
					}}
					dismissable
				/>
			</div>
			<div style={{ padding: 16 }}>
				<IconButton2
					type="button"
					icon="cookie"
					title="2"
				/>
			</div>
			<Notification
				content="This is test"
				duration={5000}
				dismissable
			/>
			<Notification
				content="This is test 2"
				duration={3000}
				action={{
					label: 'Shieeet',
					onClick: () => {},
				}}
			/>
			<Notification content="This is test 3" />
			<Notification
				content="This is test 4"
				duration={2000}
			/>
			<Notification content="This is test 5" />
		</div>
	)
}
