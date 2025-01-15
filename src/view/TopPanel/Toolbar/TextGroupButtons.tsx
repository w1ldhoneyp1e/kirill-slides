import {
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import {Marker24px} from '../../../assets/icons/Marker24px'
import {Minus24px} from '../../../assets/icons/Minus24px'
import {Plus24px} from '../../../assets/icons/Plus24px'
import {Button} from '../../../components/Button/Button'
import {ButtonGroup} from '../../../components/ButtonGroup/ButtonGroup'
import {ColorPickerPopover} from '../../../components/colorPickerPopover/ColorPickerPopover'
import {Divider} from '../../../components/Divider/Divider'
import {NumberField} from '../../../components/numberField/NumberField'
import {type SlideType, type TextType} from '../../../store/types'
import {useAppActions} from '../../hooks/useAppActions'
import styles from './Toolbar.module.css'

type TextGroupButtonsProps = {
	slides: SlideType[],
	selectedObjects: string[],
	selectedSlide: string,
}

export function TextGroupButtons({
	slides,
	selectedObjects,
	selectedSlide,
}: TextGroupButtonsProps) {
	const {
		changeTextFontSize,
		changeTextFontColor,
	} = useAppActions()

	const slide = slides.find(s => s.id === selectedSlide)
	const text = slide?.contentObjects.find(o => o.id === selectedObjects[0]) as TextType | undefined

	const [fontSize, setFontSize] = useState<number>(16)
	const [fontColor, setFontColor] = useState<string>('#000000')
	const [colorPickerOpen, setColorPickerOpen] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useLayoutEffect(() => {
		if (text) {
			setFontSize(text.fontSize)
			setFontColor(text.fontColor)
		}
	}, [text])

	if (!text) {
		return null
	}

	return (
		<>
			<Divider
				size="half"
				type="vertical"
			/>
			<ButtonGroup
				items={[{
					type: 'icon',
					state: 'default',
					ref: buttonRef,
					icon: Marker24px,
					onClick: () => setColorPickerOpen(true),
				}]}
			/>
			<div className={styles.fontSizeContainer}>
				<Button
					type="icon"
					icon={Plus24px}
					onClick={() => {
						setFontSize(fontSize + 1)
						changeTextFontSize({
							slideId: selectedSlide,
							objId: selectedObjects[0],
							fontSize: fontSize + 1,
						})
					}}
					state="default"
				/>
				<NumberField
					className={styles.fontSizeField}
					value={fontSize}
					maxValue={100}
					onChange={value => {
						setFontSize(value)
						changeTextFontSize({
							slideId: selectedSlide,
							objId: selectedObjects[0],
							fontSize: value,
						})
					}}
				/>
				<Button
					type="icon"
					icon={Minus24px}
					onClick={() => {
						setFontSize(fontSize - 1)
						changeTextFontSize({
							slideId: selectedSlide,
							objId: selectedObjects[0],
							fontSize: fontSize - 1,
						})
					}}
					state="default"
				/>
			</div>
			{colorPickerOpen && (
				<ColorPickerPopover
					value={fontColor}
					onChange={(color: string) => {
						changeTextFontColor({
							slideId: selectedSlide,
							objId: selectedObjects[0],
							fontColor: color,
						})
					}}
					onClose={() => setColorPickerOpen(false)}
					anchorRef={buttonRef}
				/>
			)}
		</>
	)
}
