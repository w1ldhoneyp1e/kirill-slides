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
	const {
		setSelection,
		changeObjectPosition,
	} = useAppActions()
	const selectedObjIds = useAppSelector((editor => editor.selection.selectedObjIds))

	const textRef = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState<PositionType>(text.position)

	const isSelected = useMemo(
		() => selectedObjIds.includes(text.id),
		[selectedObjIds, text.id],
	)

	const onMouseMove = useCallback((delta: PositionType) => {
		const updatedPosition = {
			x: position.x + delta.x,
			y: position.y + delta.y,
		}

		setPosition(updatedPosition)
	}, [position])

	const onMouseUp = useCallback((delta: PositionType) => {
		const updatedPosition = {
			x: position.x + delta.x,
			y: position.y + delta.y,
		}

		changeObjectPosition({
			id: text.id,
			position: updatedPosition,
		})
	},
	[changeObjectPosition, position, text.id])

	useDragAndDrop({
		ref: textRef,
		onMouseMove,
		onMouseUp,
	})

	const boundedPosition = useBoundedPosition({
		x: position.x * scale,
		y: position.y * scale,
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
		</div>

	)
}

export {Text}
