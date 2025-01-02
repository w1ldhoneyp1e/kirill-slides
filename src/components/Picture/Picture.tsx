import {useMemo} from 'react'
import {type PictureType} from '../../store/types'
import {useAppActions} from '../../view/hooks/useAppActions'
import {useAppSelector} from '../../view/hooks/useAppSelector'
import styles from './Picture.module.css'

type PictureProps = {
	pictureObj: PictureType,
	scale: number,
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
				styles.pictureObj
                + `${isSelected
                    ? styles.selected
                    : ''
                }`
			}
			style={style}
			onClick={() => setSelection({
				type: 'object',
				id: pictureObj.id,
			})}
		/>
	)
}

export {Picture}
