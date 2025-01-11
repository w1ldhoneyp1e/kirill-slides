import {
	useCallback,
	useMemo,
	useRef,
} from 'react'
import {
	type PictureType,
	type PositionType,
	type SizeType,
} from '../../store/types'
import {joinStyles} from '../../utils/joinStyles'
import {useAppActions} from '../../view/hooks/useAppActions'
import {useAppSelector} from '../../view/hooks/useAppSelector'
import {useDragAndDrop} from '../../view/hooks/useDragAndDrop'
import {boundPosition} from '../../view/utils/boundPosition'
import {ResizeFrame} from '../ResizeFrame/ResizeFrame'
import styles from './Picture.module.css'

type PictureProps = {
	parentRef: React.RefObject<HTMLDivElement>,
	slideId: string,
	pictureId: string,
	scale: number,
}

function Picture({
	parentRef,
	slideId,
	pictureId,
	scale,
}: PictureProps) {
	const selectedObjIds = useAppSelector((editor => editor.selection.selectedObjIds))
	const {
		setSelection,
		changeObjectPosition,
		changeObjectSize,
	} = useAppActions()

	const picture = useAppSelector(
		editor => editor.presentation.slides
			.find(s => s.id === slideId)!.contentObjects
			.find(o => o.id === pictureId) as PictureType,
	)

	const pictureRef = useRef<HTMLImageElement>(null)
	const isSelected = useMemo(
		() => selectedObjIds.includes(pictureId),
		[pictureId, selectedObjIds],
	)

	const onMouseMove = useCallback((delta: PositionType) => {
		const updatedPosition = boundPosition({
			x: picture.position.x + delta.x,
			y: picture.position.y + delta.y,
		},
		parentRef,
		pictureRef)

		changeObjectPosition({
			id: picture.id,
			position: updatedPosition,
		})
	}, [picture, parentRef, changeObjectPosition])

	useDragAndDrop({
		ref: pictureRef,
		onMouseMove,
	})

	const style = useMemo(() => ({
		top: picture.position.y * scale,
		left: picture.position.x * scale,
		width: picture.size.width * scale,
		height: picture.size.height * scale,
	}), [picture, scale])

	return (
		<>
			<img
				ref={pictureRef}
				className={joinStyles(styles.picture)}
				src={picture.src}
				style={style}
				draggable="false"
				onClick={e => {
					e.preventDefault()
					setSelection({
						type: 'object',
						id: pictureId,
					})
				}}
			/>
			{isSelected && scale === 1
				? (
					<ResizeFrame
						parentRef={parentRef}
						objectId={pictureId}
						slideId={slideId}
						setPosition={(position: PositionType) => changeObjectPosition({
							id: pictureId,
							position,
						})}
						position={picture.position}
						setSize={(size: SizeType) => changeObjectSize({
							slideId,
							objId: pictureId,
							size,
						})}
						size={picture.size}
					/>
				)
				: null}
		</>
	)
}

export {
	Picture,
}
