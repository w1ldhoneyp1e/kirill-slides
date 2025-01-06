import {useCallback, useState} from 'react'
import {Images24px} from '../../assets/Images24px'
import {EmptyState} from '../../components/EmptyState/EmptyState'
import {Popup} from '../../components/Popup/Popup'
import Preloader from '../../components/Preloader/Preloader'
import {SearchField} from '../../components/SearchField/SearchField'
import {useAppActions} from '../hooks/useAppActions'
import {ImageList} from '../ImageList/ImageList'
import {useImageSearch} from './hooks/useImageSearch'
import styles from './ImageListPopup.module.css'
import {type Image} from './types'

type ImageListPopupProps = {
	onClose: () => void,
}

function ImageListPopup({
	onClose,
}: ImageListPopupProps) {
	const {addPicture} = useAppActions()

	const [searchValue, setSearchValue] = useState('')
	const [isLoading, setLoading] = useState(false)
	const [selectedImage, setSelectedImage] = useState<Image | null>(null)

	const {
		images,
		initialized,
		searchImages,
	} = useImageSearch()

	const onAccept = useCallback(() => {
		setLoading(true)
		if (selectedImage === null) {
			return
		}
		addPicture({
			src: selectedImage.url,
			height: selectedImage.height,
			width: selectedImage.width,
		})
		setLoading(false)
		onClose()
	}, [addPicture, onClose, selectedImage])

	const onSearch = useCallback(() => {
		searchImages(searchValue.trim())
		setSelectedImage(null)
	}, [searchImages, searchValue])

	const onSelect = useCallback((image: Image) => {
		images.forEach(_image => {
			_image.selected = false
		})
		setSelectedImage(image)
		image.selected = true
	}, [images])

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
					className={styles.searchField}
					onInput={setSearchValue}
					onSearch={onSearch}
					placeholder="Мишки в лесу..."
				/>
				{(images.length || initialized === false)
					? initialized
						? (
							<ImageList
								images={images}
								onSelect={onSelect}
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
