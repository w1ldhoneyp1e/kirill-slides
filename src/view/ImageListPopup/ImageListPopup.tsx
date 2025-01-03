import {useState} from 'react'
import {Images24px} from '../../assets/Images24px'
import {EmptyState} from '../../components/EmptyState/EmptyState'
import {Popup} from '../../components/Popup/Popup'
import Preloader from '../../components/Preloader/Preloader'
import {SearchField} from '../../components/SearchField/SearchField'
import {useAppActions} from '../hooks/useAppActions'
import {ImageList} from '../ImageList/ImageList'
import {useImageSearch} from './hooks/useImageSearch'
import styles from './ImageListPopup.module.css'

type ImageListPopupProps = {
	onClose: () => void,
}

function ImageListPopup({
	onClose,
}: ImageListPopupProps) {
	const {addPicture} = useAppActions()

	const [searchValue, setSearchValue] = useState('')
	const [isLoading, setLoading] = useState(false)
	const [selectedImages, setSelectedImages] = useState<string[]>([])

	const {
		images,
		initialized,
		searchImages,
	} = useImageSearch()

	const onAccept = () => {
		setLoading(true)
		selectedImages.forEach(
			image => {
				addPicture({
					src: image,
					height: 100,
					width: 100,
				})
			})
		setLoading(false)
		onClose()
	}

	const onSelectImage = (imageUrl: string) => {
		setSelectedImages(prev => [...prev, imageUrl])
	}

	const handleSearch = () => {
		searchImages(searchValue.trim()) // Выполняем запрос только при нажатии кнопки
	}

	return (
		<Popup
			title="Поиск картинок"
			width={460}
			className={styles.popup}
			onClose={onClose}
			footer={[
				{
					text: 'Вернуться',
					onClick: onClose,
				},
				{
					text: 'Выбрать',
					onClick: onAccept,
					state: isLoading
						? 'loading'
						: 'default',
				},
			]}
		>
			<>
				<SearchField
					onInput={setSearchValue}
					onSearch={handleSearch}
					placeholder="Мишки в лесу..."
				/>
				{(images.length || initialized === false)
					? initialized
						? (
							<ImageList
								images={images}
								onSelect={onSelectImage}
							/>
						)
						: <Preloader />
					: <EmptyState
						icon={Images24px}
						size={120}
						height={300}
						width={400}
						message="Картинок нема"
					/>}
			</>
		</Popup>
	)
}

export {
	ImageListPopup,
}
