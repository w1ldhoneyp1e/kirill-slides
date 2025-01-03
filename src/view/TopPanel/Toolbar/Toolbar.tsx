import {
	useMemo,
	useRef,
	useState,
} from 'react'
import {AddPicture24px} from '../../../assets/AddPicture24px.tsx'
import {Laptop24px} from '../../../assets/Laptop24px.tsx'
import {Search24px} from '../../../assets/Search24px.tsx'
import {type ButtonProps} from '../../../components/Button/Button.tsx'
import {ButtonGroup} from '../../../components/ButtonGroup/ButtonGroup.tsx'
import {Divider} from '../../../components/Divider/Divider.tsx'
import {type PopoverItem, Popover} from '../../../components/Popover/Popover.tsx'
import {Popup} from '../../../components/Popup/Popup.tsx'
import {useGetButtons} from './hooks/useGetButtons.ts'
import {useImageUploader} from './hooks/useImageUploader.ts'
import styles from './Toolbar.module.css'

function Toolbar() {
	const [popoverOpened, setPopoverOpened] = useState(false)
	const [popupOpened, setPopupOpened] = useState(false)
	const [isLoading, setLoading] = useState(false)
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
		icon: AddPicture24px,
		onClick: () => setPopoverOpened(true),
	}

	const onAccept = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			console.log('Изображение добавлено!')
			setPopupOpened(false)
		}, 2000) // Симуляция загрузки
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
				<Popup
					className={styles.popup}
					title="Test Popup"
					onClose={() => setPopupOpened(false)}
					footer={[
						{
							text: 'Отмена',
							onClick: () => setPopupOpened(false),
						},
						{
							text: 'Принять',
							onClick: onAccept,
							state: isLoading
								? 'loading'
								: 'default',
						},
					]}
				>
					<div>
						{'Test'}
					</div>
				</Popup>
			)}
		</div>
	)
}

export {Toolbar}
