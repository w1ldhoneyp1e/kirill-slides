import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import {
	type PositionType,
	type SizeType,
	type TextType,
} from '../../store/types'
import {isValidOffset} from '../../utils/isValidOffset'
import {useAppActions} from '../../view/hooks/useAppActions'
import {useAppSelector} from '../../view/hooks/useAppSelector'
import {useDragAndDrop} from '../../view/hooks/useDragAndDrop'
import {boundPosition} from '../../view/utils/boundPosition'
import {ResizeFrame} from '../ResizeFrame/ResizeFrame'
import styles from './Text.module.css'

type TextProps = {
	textId: string,
	slideId: string,
	parentRef: React.RefObject<HTMLDivElement>,
	scale: number,
}

function Text({
	textId,
	slideId,
	parentRef,
	scale,
}: TextProps) {
	const {
		deselect,
		setSelection,
		changeObjectPosition,
	} = useAppActions()
	const selectedObjects = useAppSelector(editor => editor.selection.selectedObjIds)
	const text = useAppSelector(
		editor => editor.presentation.slides
			.find(s => s.id === slideId)!.contentObjects
			.find(o => o.id === textId) as TextType,
	)

	const [size, setSize] = useState<SizeType>(text.size)
	const [position, setPosition] = useState<PositionType>(text.position)
	const textRef = useRef<HTMLDivElement>(null)
	const isSelected = selectedObjects.includes(text.id)

	const onMouseMove = useCallback((delta: PositionType) => {
		if (!isValidOffset(delta)) {
			return
		}
		const updatedPosition = boundPosition({
			x: text.position.x + delta.x,
			y: text.position.y + delta.y,
		},
		parentRef,
		textRef)

		setPosition(updatedPosition)
	}, [parentRef, text.position])

	const onMouseUp = useCallback((delta: PositionType) => {
		if (!isValidOffset(delta)) {
			return
		}
		const updatedPosition = boundPosition({
			x: text.position.x + delta.x,
			y: text.position.y + delta.y,
		},
		parentRef,
		textRef)

		changeObjectPosition({
			id: text.id,
			position: updatedPosition,
		})
	}, [changeObjectPosition, parentRef, text.position, text.id])

	useDragAndDrop({
		ref: textRef,
		onMouseMove,
		onMouseUp,
	})

	useEffect(() => {
		setPosition(text.position)
		setSize(text.size)
	}, [text.position, text.size])

	const style = useMemo(() => ({
		top: position.y * scale,
		left: position.x * scale,
		color: text.hexColor,
		fontSize: text.fontSize * scale,
		width: size.width * scale,
		height: size.height * scale,
	}), [position.y, position.x, scale, text.hexColor, text.fontSize, size.width, size.height])

	return (
		<>
			<div
				ref={textRef}
				className={styles.text}
				style={style}
				onClick={e => e.preventDefault()}
				onMouseDown={e => {
					deselect({
						type: 'object',
					})
					setSelection({
						type: 'object',
						id: text.id,
					})
					e.preventDefault()
				}}
			>
				{text.value}
			</div>
			{isSelected && scale === 1
				? (
					<ResizeFrame
						parentRef={parentRef}
						objectId={text.id}
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

export {Text}
