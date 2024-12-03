import { useMemo } from 'react'
import styles from './Picture.module.css'
import { useAppSelector } from '../../view/hooks/useAppSelector'
import { useAppActions } from '../../view/hooks/useAppActions'
import { PictureType } from '../../store/types'

type PictureProps = {
	pictureObj: PictureType
	scale: number
}

function Picture({
    pictureObj,
    scale,
}: PictureProps) {
    const selectedSlideId = useAppSelector((editor => editor.selection.selectedSlideId))
    const {setSelection} = useAppActions()

    const isSelected = useMemo(
        () => selectedSlideId.includes(pictureObj.id),
        [selectedSlideId, pictureObj.id],
    )

    const style = {
        width: pictureObj.size.width * scale,
        height: pictureObj.size.height * scale,
        backgroundImage: `url(${pictureObj.src})`,
    }

    return (
        <div
            className={
                styles.pictureObj +
                `${isSelected
                    ? styles.selected
                    : ''
                }`
            }
            style={style}
            onClick={() => setSelection({
                type: 'object',
                id: pictureObj.id,
            })}
        ></div>
    )
}

export { Picture }
