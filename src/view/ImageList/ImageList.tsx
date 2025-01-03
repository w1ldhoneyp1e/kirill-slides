import React from 'react'
import {getUID} from '../../store/methods'

type ImageItemProps = {
	imageUrl: string,
	onSelect: () => void,
}

const ImageItem: React.FC<ImageItemProps> = ({imageUrl, onSelect}) => (
	<div
		className="image-item"
		onClick={onSelect}
	>
		<img
			src={imageUrl}
			alt="image"
		/>
	</div>
)

const ImageList: React.FC<{
	images: string[],
	onSelect: (image: string) => void,
}> = ({images, onSelect}) => (
	<div className="image-list">
		{images.map(imageUrl => (
			<ImageItem
				key={getUID()}
				imageUrl={imageUrl}
				onSelect={() => onSelect(imageUrl)}
			/>
		))}
	</div>
)

export {ImageList}
