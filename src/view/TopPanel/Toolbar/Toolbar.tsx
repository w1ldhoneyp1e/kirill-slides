import {
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import {AddPicture24px} from '../../../assets/icons/AddPicture24px.tsx'
import {Drop24px} from '../../../assets/icons/Drop24px.tsx'
import {Laptop24px} from '../../../assets/icons/Laptop24px.tsx'
import {Minus24px} from '../../../assets/icons/Minus24px.tsx'
import {Plus24px} from '../../../assets/icons/Plus24px.tsx'
import {Search24px} from '../../../assets/icons/Search24px.tsx'
import {type ButtonProps, Button} from '../../../components/Button/Button.tsx'
import {ButtonGroup} from '../../../components/ButtonGroup/ButtonGroup.tsx'
import {Divider} from '../../../components/Divider/Divider.tsx'
import {type PopoverItem, Popover} from '../../../components/Popover/Popover.tsx'
import {type SlideType, type TextType} from '../../../store/types.ts'
import {useAppActions} from '../../hooks/useAppActions.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {ImageListPopup} from '../../ImageListPopup/ImageListPopup.tsx'
import {useGetButtons} from './hooks/useGetButtons.ts'
import {useImageUploader} from './hooks/useImageUploader.ts'
import styles from './Toolbar.module.css'

function Toolbar() {
	const selectedSlide = useAppSelector(editor => editor.selection.selectedSlideId)
	const selectedObjects = useAppSelector(editor => editor.selection.selectedObjIds)
	const slides = useAppSelector(editor => editor.slides)

	const [popoverOpened, setPopoverOpened] = useState(false)
	const [popupOpened, setPopupOpened] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const {
		addButton,
		undoButton,
		redoButton,
		cursorButton,
		addTextButton,
	} = useGetButtons()

	const uploadImage = useImageUploader()

	const addImageButton: ButtonProps = {
		ref: buttonRef,
		type: 'icon',
		state: selectedSlide
			? 'default'
			: 'disabled',
		icon: AddPicture24px,
		onClick: () => setPopoverOpened(true),
	}

	const items: PopoverItem[] = useMemo(() => [
		{
			type: 'icon-text',
			icon: Laptop24px,
			text: 'Загрузить',
			onClick: () => {
				uploadImage()
				setPopoverOpened(false)
			},
		},
		{
			type: 'icon-text',
			icon: Search24px,
			text: 'Найти в интернете',
			onClick: () => {
				setPopoverOpened(false)
				setPopupOpened(true)
			},
		},
	], [uploadImage])


	return (
		<div className={styles.toolBar}>
			<ButtonGroup
				items={[addButton]}
			/>
			<Divider
				type="vertical"
				size="half"
			/>
			<ButtonGroup
				items={[
					undoButton, redoButton,
				]}
			/>
			<Divider
				type="vertical"
				size="half"
			/>
			<ButtonGroup
				items={[cursorButton, addTextButton, addImageButton]}
			/>
			<SlideGroupButtons
				selectedObjects={selectedObjects}
				selectedSlide={selectedSlide}
			/>
			<TextGroupButtons
				slides={slides}
				selectedSlide={selectedSlide}
				selectedObjects={selectedObjects}
			/>
			{popoverOpened && (
				<Popover
					items={items}
					onClose={() => setPopoverOpened(false)}
					anchorRef={buttonRef}
				/>
			)}
			{popupOpened && (
				<ImageListPopup
					onClose={() => setPopupOpened(false)}
				/>
			)}
		</div>
	)
}

type SlideGroupButtonsProps = {
	selectedObjects: string[],
	selectedSlide: string,
}

function SlideGroupButtons({
	selectedObjects,
	selectedSlide,
}: SlideGroupButtonsProps) {
	const {
		backgroundButton,
	} = useGetButtons()

	return selectedObjects.length === 0 && selectedSlide && (
		<>
			<Divider
				size="half"
				type="vertical"
			/>
			<ButtonGroup
				items={[backgroundButton]}
			/>
		</>

	)
}

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
	} = useAppActions()

	const slide = slides.find(s => s.id === selectedSlide)
	const text = slide?.contentObjects.find(o => o.id === selectedObjects[0]) as TextType | undefined

	const [fontSize, setFontSize] = useState<number>(16)
	const [fontColor, setFontColor] = useState<string>('#000000')

	useEffect(() => {
		if (text) {
			setFontSize(text.fontSize)
			setFontColor(text.fontColor)
		}
	}, [text])

	const fontSizeColorButton: ButtonProps = {
		type: 'icon',
		icon: Drop24px,
		// TODO: add font size color
		onClick: () => {},
	}

	return (text && (
		<>
			<ButtonGroup
				items={[fontSizeColorButton]}
			/>
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
				value={text.fontSize}
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
		</>
	)
	)
}

export {Toolbar}
