import * as Ariakit from '@ariakit/react'
import { type FunctionComponent, useState } from 'react'
import { Notification } from 'features/notifications'
import { IconButton } from 'lib/components/IconButton'
import { Snackbar } from 'lib/components/Snackbar'
import { Switch } from 'lib/components/Switch'
import { IconButton as IconButton2 } from 'lib/components2/IconButton'
import { Switch as Switch2 } from 'lib/components2/Switch'
import { TextInput } from 'lib/components2/TextInput'

export const Home: FunctionComponent = () => {
	const [isOn, setIsOn] = useState(false)

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
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
			<TextInput
				label="First name"
				value=""
				supportingText="Must be at least 8 characters long"
				hasError
			/>
			<Switch />
			{/* <Switch2 /> */}
			<Switch
				checked={isOn}
				onCheckedChange={setIsOn}
			/>
			<Switch2
				checked={isOn}
				onCheckedChange={setIsOn}
			/>
		</div>
	)
}
