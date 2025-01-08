import {
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react'
import {type PositionType, type TextType} from '../../store/types'
import {useAppActions} from '../../view/hooks/useAppActions'
import {useAppSelector} from '../../view/hooks/useAppSelector'
import {useDragAndDrop} from '../../view/hooks/useDragAndDrop'
import {boundPosition} from '../../view/utils/boundPosition'
import {ResizeFrame} from '../ResizeFrame/ResizeFrame'
import styles from './Text.module.css'

type TextProps = {
	text: TextType,
	slideId: string,
	parentRef: React.RefObject<HTMLDivElement>,
	scale: number,
}

function Text({
	text,
	slideId,
	parentRef,
	scale,
}: TextProps) {
	const {
		setSelection,
		changeObjectPosition,
	} = useAppActions()
	const selectedObjects = useAppSelector(editor => editor.selection.selectedObjIds)

	const textRef = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState(text.position)
	const [size, setSize] = useState(text.size)

	const isSelected = selectedObjects.includes(text.id)

	const onMouseMove = useCallback((delta: PositionType) => {
		const updatedPosition = boundPosition({
			x: position.x + delta.x,
			y: position.y + delta.y,
		},
		parentRef,
		textRef)

		setPosition(updatedPosition)
	}, [parentRef, position])

	const onMouseUp = useCallback((delta: PositionType) => {
		const updatedPosition = boundPosition({
			x: position.x + delta.x,
			y: position.y + delta.y,
		},
		parentRef,
		textRef)

		changeObjectPosition({
			id: text.id,
			position: updatedPosition,
		})
	}, [changeObjectPosition, parentRef, position, text.id])

	useDragAndDrop({
		ref: textRef,
		onMouseMove,
		onMouseUp,
	})

	const style = useMemo(() => ({
		top: position.y * scale,
		left: position.x * scale,
		color: text.hexColor,
		fontSize: text.fontSize * scale,
		width: size.width * scale,
		height: size.height * scale,
	}), [position, scale, size, text.fontSize, text.hexColor])

	return (
		<>
			<div
				ref={textRef}
				className={styles.text}
				style={style}
				onClick={e => {
					if (e.defaultPrevented) {
						return
					}
					setSelection({
						type: 'object',
						id: text.id,
					})
					e.preventDefault()
				}}
			>
				{text.value}
			</div>
			{isSelected
				? (
					<ResizeFrame
						parentRef={parentRef}
						objectId={text.id}
						slideId={slideId}
						position={position}
						setPosition={setPosition}
						size={size}
						setSize={setSize}
					/>
				)
				: ''}
		</>
	)
}

export {Text}
