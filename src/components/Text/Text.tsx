import {
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react'
import {type PositionType, type TextType} from '../../store/types'
import {useAppActions} from '../../view/hooks/useAppActions'
import {useAppSelector} from '../../view/hooks/useAppSelector'
import {useBoundedPosition} from '../../view/hooks/useBoundedPosition'
import {useDragAndDrop} from '../../view/hooks/useDragAndDrop'
import {ResizeFrame} from '../ResizeFrame/ResizeFrame'
import styles from './Text.module.css'

type TextProps = {
	text: TextType,
	parentRef: React.RefObject<HTMLDivElement>,
	scale: number,
}

function Text({
	text,
	parentRef,
	scale,
}: TextProps) {
	const textRef = useRef<HTMLDivElement>(null)
	const [isDrag, setIsDrag] = useState(false)
	const selectedObjIds = useAppSelector((editor => editor.selection.selectedObjIds))
	const {
		setSelection, changeObjectPosition,
	} = useAppActions()

	const isSelected = useMemo(
		() => selectedObjIds.includes(text.id),
		[selectedObjIds, text.id],
	)

	const dispatchFn = useCallback(
		(position: PositionType) => {
			changeObjectPosition({
				id: text.id,
				position,
			})
		},
		[changeObjectPosition, text.id],
	)

	const updatedPosition = useDragAndDrop({
		ref: textRef,
		parentRef,
		onMouseDown: () => setIsDrag(true),
		onMouseUp: (position: PositionType) => {
			dispatchFn(position)
			setIsDrag(false)
		},
	})

	const boundedPosition = useBoundedPosition({
		x: updatedPosition && isDrag
			? updatedPosition.x * scale
			: text.position.x * scale,
		y: updatedPosition && isDrag
			? updatedPosition.y * scale
			: text.position.y * scale,
	}, parentRef, textRef)

	const style = {
		top: boundedPosition.y,
		left: boundedPosition.x,
		color: text.hexColor,
		fontSize: text.fontSize * scale,
		width: text.size.width * scale,
		height: text.size.height * scale,
	}

	return (
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
			{isSelected
                && scale === 1
				&& (
					<ResizeFrame
						textRef={textRef}
						parentRef={parentRef}
						objId={text.id}
						scale={scale}
						onStartResize={() => {}}
						onStopResize={() => {}}
					/>
				)}
		</div>

	)
}

export {Text}
