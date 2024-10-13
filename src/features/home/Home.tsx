import { type FunctionComponent } from 'react'
import { Slider } from 'lib/components/Slider'
import { Slider as Slider2 } from 'lib/components2/Slider'

export const Home: FunctionComponent = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 32 }}>
			<Slider
				label="Test"
				min={0}
				max={100}
				step={1}
				value={25}
			/>
			<Slider
				label="Test"
				min={0}
				max={100}
				step={1}
				disabled
			/>
			<Slider2
				label="Test"
				min={0}
				max={100}
				step={1}
				value={25}
			/>
			<Slider2
				label="Test"
				min={0}
				max={100}
				step={1}
				disabled
			/>
		</div>
	)
}
