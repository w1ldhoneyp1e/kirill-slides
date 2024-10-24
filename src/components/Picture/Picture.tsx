import { dispatch } from '../../store/editor'
import { setObjectAsSelected } from '../../store/methods'
import { PictureType } from '../../store/types'
import styles from './Picture.module.css'

type PictureProps = {
	pictureObj: PictureType
	isSelected: boolean
}

function Picture({ pictureObj, isSelected }: PictureProps) {
	const style = {
		width: pictureObj.size.width,
		height: pictureObj.size.height,
		backgroundImage: `url(${pictureObj.src})`,
		backgroundSize: 'cover',
		border: isSelected ? '2px solid black' : '',
	}

	return (
		<div
			className={styles.pictureObj}
			style={style}
			onClick={() => dispatch(setObjectAsSelected, { id: pictureObj.id })}
		></div>
	)
}

export { Picture }
