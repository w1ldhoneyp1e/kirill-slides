import {useRef} from 'react'
import {type PositionType} from '../../../store/types'
import {useDragAndDrop} from '../../../view/hooks/useDragAndDrop'
import {boundPosition} from '../../../view/utils/boundPosition'
import styles from './Square.module.css'

type SquareProps = {
	parentRef: React.RefObject<HTMLDivElement>,
	position: PositionType,
	cursor: string,
	onResize: (delta: PositionType) => void,
	onResizeEnd: (delta: PositionType) => void,
}

function Square({
	parentRef,
	position,
	cursor,
	onResize,
	onResizeEnd,
}: SquareProps) {
	const squareRef = useRef<HTMLDivElement>(null)

	useDragAndDrop({
		ref: squareRef,
		onMouseMove: onResize,
		onMouseUp: onResizeEnd,
	})

	const boundedPosition = boundPosition(
		{
			x: position.x,
			y: position.y,
		},
		parentRef,
		squareRef,
	)

	const style = {
		top: boundedPosition.y,
		left: boundedPosition.x,
	}

	return (
		<div
			ref={squareRef}
			className={styles.square}
			style={style}
		/>
	)
}

export {
	Square,
}
