import { Button } from '@components/Button'
import { AnimateDialog } from '@components/dialog/AnimateDialog'
import { SimpleDialog } from '@components/dialog/Dialog'
import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent, useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { type Control, useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { type RecipeFormValues } from './scheme'

type ColorPickerProps = {
	control: Control<RecipeFormValues>
}

export const ColorPicker: FunctionComponent<ColorPickerProps> = ({ control }) => {
	const { t } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const { field } = useController({ control, name: 'color' })
	const [localColor, setLocalColor] = useState(field.value)

	useEffect(() => {
		setLocalColor(field.value)
	}, [field.value])

	return (
		<Fragment>
			<Color
				style={{ backgroundColor: field.value ?? undefined }}
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
								color={localColor ?? undefined}
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
									field.onChange(localColor)
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
