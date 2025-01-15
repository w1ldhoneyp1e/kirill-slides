import {useRef, useState} from 'react'
import {Drop24px} from '../../../assets/icons/Drop24px'
import {Fill24px} from '../../../assets/icons/Fill24px'
import {Gradient24px} from '../../../assets/icons/Gradient24px'
import {PictureDashBorder24px} from '../../../assets/icons/PictureDashBorder24px'
import {Button} from '../../../components/Button/Button'
import {ColorPickerPopover} from '../../../components/colorPickerPopover/ColorPickerPopover'
import {Divider} from '../../../components/Divider/Divider'
import {type PopoverItem, Popover} from '../../../components/Popover/Popover'
import {useAppActions} from '../../hooks/useAppActions'

type SlideGroupButtonsProps = {
	selectedObjects: string[],
	selectedSlide: string,
}

export function SlideGroupButtons({
	selectedObjects,
	selectedSlide,
}: SlideGroupButtonsProps) {
	const {changeSlideBackground} = useAppActions()

	const [popoverOpen, setPopoverOpen] = useState(false)
	const [colorPickerOpen, setColorPickerOpen] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	if (selectedObjects.length !== 0 || !selectedSlide) {
		return null
	}

	const backgroundOptions: PopoverItem[] = [
		{
			type: 'icon-text',
			icon: PictureDashBorder24px,
			text: 'Открыть с компьютера',
			onClick: () => {
				const input = document.createElement('input')
				input.type = 'file'
				input.accept = 'image/*'
				input.onchange = e => {
					const file = (e.target as HTMLInputElement).files?.[0]
					if (file) {
						const reader = new FileReader()
						reader.onload = () => {
							changeSlideBackground({
								value: reader.result as string,
								type: 'image',
							})
						}
						reader.readAsDataURL(file)
					}
				}
				input.click()
			},
		},
		{
			type: 'icon-text',
			icon: Drop24px,
			text: 'Сплошной фон',
			onClick: () => setColorPickerOpen(true),
		},
		{
			type: 'icon-text',
			icon: Gradient24px,
			text: 'Градиент',
			onClick: () => {},
		},
	]

	return (
		<>
			<Divider
				size="half"
				type="vertical"
			/>
			<Button
				ref={buttonRef}
				type="icon"
				state="default"
				icon={Fill24px}
				onClick={() => setPopoverOpen(true)}
			/>
			{popoverOpen && (
				<Popover
					items={backgroundOptions}
					anchorRef={buttonRef}
					onClose={() => setPopoverOpen(false)}
				/>
			)}
			{colorPickerOpen && (
				<ColorPickerPopover
					value="#FFFFFF"
					onChange={color => {
						changeSlideBackground({
							value: color,
							type: 'solid',
						})
						setColorPickerOpen(false)
						setPopoverOpen(false)
					}}
					onClose={() => setColorPickerOpen(false)}
					anchorRef={buttonRef}
				/>
			)}
		</>
	)
}
