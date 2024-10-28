import { Button } from '@components/Button'
import { AnimateDialog } from '@components/dialog/AnimateDialog'
import { SimpleDialog } from '@components/dialog/Dialog'
import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent, useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useTranslation } from 'react-i18next'

type ColorPickerProps = {
	color?: string
	onColorChange: (color?: string) => void
}

export const ColorPicker: FunctionComponent<ColorPickerProps> = ({ color, onColorChange }) => {
	const { t } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const [localColor, setLocalColor] = useState(color)

	useEffect(() => {
		setLocalColor(color)
	}, [color])

	return (
		<Fragment>
			<Color
				style={{ backgroundColor: color }}
				onClick={() => setIsOpen(true)}
				type="button"
			/>
			<AnimateDialog open={isOpen}>
				<SimpleDialog
					title={t('newRecipe.fields.color.dialog.title')}
					description={t('newRecipe.fields.color.dialog.description')}
					extraContent={(
						<ExtraContent>
							<HexColorPicker
								color={localColor}
								onChange={setLocalColor}
							/>
						</ExtraContent>
					)}
					onClose={() => setIsOpen(false)}
					actions={[
						(
							<Button
								key="cancel"
								variant="text"
								type="button"
								onClick={() => setIsOpen(false)}
							>
								{t('newRecipe.fields.color.dialog.cancel')}
							</Button>
						),
						(
							<Button
								key="add"
								variant="filled"
								type="button"
								onClick={() => {
									setIsOpen(false)
									onColorChange(localColor)
								}}
							>
								{t('newRecipe.fields.color.dialog.select')}
							</Button>
						),
					]}
				/>
			</AnimateDialog>
		</Fragment>
	)
}

const Color = styled('button', {
	base: {
		width: 24,
		height: 24,
		borderRadius: 4,
		border: 'none',
	},
})

const ExtraContent = styled('div', {
	base: {
		paddingInline: 24,
		display: 'flex',
		justifyContent: 'center',
	},
})
