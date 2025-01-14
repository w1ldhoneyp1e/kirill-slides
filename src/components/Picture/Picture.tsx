import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import {
	type PictureType,
	type PositionType,
	type SizeType,
} from '../../store/types'
import {isValidOffset} from '../../utils/isValidOffset'
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
	} = useAppActions()

	const picture = useAppSelector(
		editor => editor.presentation.slides
			.find(s => s.id === slideId)!.contentObjects
			.find(o => o.id === pictureId) as PictureType,
	)

	const [position, setPosition] = useState<PositionType>(picture.position)
	const [size, setSize] = useState<SizeType>(picture.size)
	const pictureRef = useRef<HTMLImageElement>(null)
	const isSelected = useMemo(
		() => selectedObjIds.includes(pictureId),
		[pictureId, selectedObjIds],
	)

	const onMouseMove = useCallback((delta: PositionType) => {
		if (!isValidOffset(delta)) {
			return
		}
		const updatedPosition = boundPosition({
			x: picture.position.x + delta.x,
			y: picture.position.y + delta.y,
		},
		parentRef,
		pictureRef)

		setPosition(updatedPosition)
	}, [picture, parentRef])

	const onMouseUp = useCallback((delta: PositionType) => {
		if (!isValidOffset(delta)) {
			return
		}
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

	useEffect(() => {
		setPosition(picture.position)
		setSize(picture.size)
	}, [picture.position, picture.size])

	useDragAndDrop({
		ref: pictureRef,
		onMouseMove,
		onMouseUp,
	})

	const style = useMemo(() => ({
		top: position.y * scale,
		left: position.x * scale,
		width: size.width * scale,
		height: size.height * scale,
	}), [position.x, position.y, scale, size.height, size.width])

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
						setPosition={(_position: PositionType) => setPosition(_position)}
						position={position}
						setSize={(_size: SizeType) => setSize(_size)}
						size={size}
					/>
				)
				: null}
		</>
	)
}

export {
	Picture,
}
