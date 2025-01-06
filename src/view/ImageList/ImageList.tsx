import React from 'react'
import {getUID} from '../../store/methods'
import {type Image} from '../ImageListPopup/types'
import styles from './ImageList.module.css'

type ImageItemProps = {
	image: Image,
	onSelect: () => void,
}

const ImageItem: React.FC<ImageItemProps> = ({image, onSelect}) => (
	<div
		className={styles.imageItem}
		onClick={onSelect}
	>
		<img
			src={image.url}
			alt="image"
		/>
	</div>
)

const ImageList: React.FC<{
	images: Image[],
	onSelect: (image: Image) => void,
}> = ({
	images,
	onSelect,
}) => (
	<div className={styles.imageList}>
		{images.map(image => (
			<ImageItem
				key={getUID()}
				image={image}
				onSelect={() => onSelect(image)}
			/>
		))}
	</div>
)

export {ImageList}
