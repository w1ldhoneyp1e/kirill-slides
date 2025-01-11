import {
	useCallback,
	useMemo,
	useRef,
} from 'react'
import {
	type PositionType,
	type SizeType,
	type TextType,
} from '../../store/types'
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
		setSelection,
		changeObjectPosition,
		changeObjectSize,
	} = useAppActions()
	const selectedObjects = useAppSelector(editor => editor.selection.selectedObjIds)
	const text = useAppSelector(
		editor => editor.presentation.slides
			.find(s => s.id === slideId)!.contentObjects
			.find(o => o.id === textId) as TextType,
	)

	const textRef = useRef<HTMLDivElement>(null)
	const isSelected = selectedObjects.includes(text.id)

	const onMouseMove = useCallback((delta: PositionType) => {
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
	})

	const style = useMemo(() => ({
		top: text.position.y * scale,
		left: text.position.x * scale,
		color: text.hexColor,
		fontSize: text.fontSize * scale,
		width: text.size.width * scale,
		height: text.size.height * scale,
	}), [text.position, scale, text.size, text.fontSize, text.hexColor])

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
			{isSelected && scale === 1
				? (
					<ResizeFrame
						parentRef={parentRef}
						objectId={text.id}
						slideId={slideId}
						setPosition={(position: PositionType) => changeObjectPosition({
							id: textId,
							position,
						})}
						position={text.position}
						setSize={(size: SizeType) => changeObjectSize({
							slideId,
							objId: textId,
							size,
						})}
						size={text.size}
					/>
				)
				: null}
		</>
	)
}

export {Text}
