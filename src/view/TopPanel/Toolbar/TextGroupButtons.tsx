import {
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import {Font24px} from '../../../assets/icons/Font24px'
import {Marker24px} from '../../../assets/icons/Marker24px'
import {Minus24px} from '../../../assets/icons/Minus24px'
import {Plus24px} from '../../../assets/icons/Plus24px'
import {type ButtonProps, Button} from '../../../components/Button/Button'
import {ButtonGroup} from '../../../components/ButtonGroup/ButtonGroup'
import {ColorPickerPopover} from '../../../components/colorPickerPopover/ColorPickerPopover'
import {Divider} from '../../../components/Divider/Divider'
import {FontFamilyPopover} from '../../../components/FontFamilyPopover/FontFamilyPopover'
import {useFontSearch} from '../../../components/FontFamilyPopover/hooks/useFontSearch'
import {NumberField} from '../../../components/numberField/NumberField'
import {type SlideType, type TextType} from '../../../store/types'
import {useAppActions} from '../../hooks/useAppActions'
import styles from './Toolbar.module.css'

type TextGroupButtonsProps = {
	slides: SlideType[],
	selectedObjects: string[],
	selectedSlide: string,
}

function TextGroupButtons({
	slides,
	selectedObjects,
	selectedSlide,
}: TextGroupButtonsProps) {
	const {
		changeTextFontSize,
		changeTextFontColor,
		changeTextFontFamily,
	} = useAppActions()

	const slide = slides.find(s => s.id === selectedSlide)
	const text = slide?.contentObjects.find(o => o.id === selectedObjects[0]) as TextType | undefined

	const [fontSize, setFontSize] = useState<number>(16)
	const [fontColor, setFontColor] = useState<string>('#000000')
	const [colorPickerOpen, setColorPickerOpen] = useState(false)
	const [searchFontFamilyOpen, setSearchFontFamilyOpen] = useState(false)
	const {
		fonts,
		initialized,
		searchFonts,
		loadFonts,
		error,
	} = useFontSearch()

	const buttonRef = useRef<HTMLButtonElement>(null)
	const fontFamiltButtonRef = useRef<HTMLButtonElement>(null)

	useLayoutEffect(() => {
		if (text) {
			setFontSize(text.fontSize)
			setFontColor(text.fontColor)
		}
	}, [text])

	if (!text) {
		return null
	}

	const markerButton: ButtonProps = {
		type: 'icon',
		state: 'default',
		ref: buttonRef,
		icon: Marker24px,
		onClick: () => setColorPickerOpen(true),
	}

	const fontFamiltButton: ButtonProps = {
		type: 'icon',
		state: 'default',
		ref: fontFamiltButtonRef,
		icon: Font24px,
		onClick: () => {
			setSearchFontFamilyOpen(true)
			loadFonts()
		},
	}

	return (
		<>
			<Divider
				size="half"
				type="vertical"
			/>
			<ButtonGroup
				items={[markerButton, fontFamiltButton]}
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
			{searchFontFamilyOpen && (
				<FontFamilyPopover
					onSelect={(font: string) => {
						changeTextFontFamily({
							slideId: selectedSlide,
							objId: selectedObjects[0],
							fontFamily: font,
						})
					}}
					onClose={() => setSearchFontFamilyOpen(false)}
					anchorRef={fontFamiltButtonRef}
					fonts={fonts}
					initialized={initialized}
					error={error}
					onSearch={searchFonts}
				/>
			)}
		</>
	)
}

export {TextGroupButtons}
