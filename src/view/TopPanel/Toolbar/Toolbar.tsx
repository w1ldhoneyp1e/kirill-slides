import {
	useMemo,
	useRef,
	useState,
} from 'react'
import {AddPicture24px} from '../../../assets/icons/AddPicture24px'
import {Laptop24px} from '../../../assets/icons/Laptop24px'
import {Search24px} from '../../../assets/icons/Search24px'
import {type ButtonProps} from '../../../components/Button/Button'
import {ButtonGroup} from '../../../components/ButtonGroup/ButtonGroup'
import {Divider} from '../../../components/Divider/Divider'
import {type PopoverItem, Popover} from '../../../components/Popover/Popover'
import {useAppSelector} from '../../hooks/useAppSelector'
import {ImageListPopup} from '../../ImageListPopup/ImageListPopup'
import {useGetButtons} from './hooks/useGetButtons'
import {useImageUploader} from './hooks/useImageUploader'
import {SlideGroupButtons} from './SlideGroupButtons'
import {TextGroupButtons} from './TextGroupButtons'
import styles from './Toolbar.module.css'

export function Toolbar() {
	const selectedSlide = useAppSelector(editor => editor.selection.selectedSlideId)
	const selectedObjects = useAppSelector(editor => editor.selection.selectedObjIds)
	const slides = useAppSelector(editor => editor.presentation.slides)

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
			<ButtonGroup items={[addButton]} />
			<Divider
				type="vertical"
				size="half"
			/>
			<ButtonGroup items={[undoButton, redoButton]} />
			<Divider
				type="vertical"
				size="half"
			/>
			<ButtonGroup items={[cursorButton, addTextButton, addImageButton]} />
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
