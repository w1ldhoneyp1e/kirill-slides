import { dispatch } from '../../store/editor'
import { setObjectAsSelected } from '../../store/methods'
import { PictureType } from '../../store/types'

import styles from './Picture.module.css'

type PictureProps = {
	pictureObj: PictureType
	isSelected: boolean
	scale: number
}

function Picture({
    pictureObj, isSelected, scale, 
}: PictureProps) {
    const style = {
        width: pictureObj.size.width * scale,
        height: pictureObj.size.height * scale,
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
