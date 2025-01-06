import {
	useMemo,
	useRef,
	useState,
} from 'react'
import {AddPicture24px} from '../../../assets/icons/AddPicture24px.tsx'
import {Laptop24px} from '../../../assets/icons/Laptop24px.tsx'
import {Search24px} from '../../../assets/icons/Search24px.tsx'
import {type ButtonProps} from '../../../components/Button/Button.tsx'
import {ButtonGroup} from '../../../components/ButtonGroup/ButtonGroup.tsx'
import {Divider} from '../../../components/Divider/Divider.tsx'
import {type PopoverItem, Popover} from '../../../components/Popover/Popover.tsx'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {ImageListPopup} from '../../ImageListPopup/ImageListPopup.tsx'
import {useGetButtons} from './hooks/useGetButtons.ts'
import {useImageUploader} from './hooks/useImageUploader.ts'
import styles from './Toolbar.module.css'

function Toolbar() {
	const selectedSlide = useAppSelector(editor => editor.selection.selectedSlideId)

	const [popoverOpened, setPopoverOpened] = useState(false)
	const [popupOpened, setPopupOpened] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const {
		addButton,
		undoButton,
		redoButton,
		cursorButton,
		addTextButton,
		backgroundButton,
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
			<Divider
				size="half"
				type="vertical"
			/>
			<ButtonGroup
				items={[backgroundButton]}
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

export {Toolbar}
