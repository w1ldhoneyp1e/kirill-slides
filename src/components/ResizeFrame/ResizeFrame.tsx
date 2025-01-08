import React, {
	useCallback,
	useEffect,
	useState,
} from 'react'
import {type PositionType, type SizeType} from '../../store/types'
import {useAppActions} from '../../view/hooks/useAppActions'
import {useGetOnResize} from './hooks/useGetOnResize'
import {Square} from './Square/Square'
import {computeHandlePositions} from './utils/computeHandlePositions'

type ResizeFrameProps = {
	parentRef: React.RefObject<HTMLDivElement>,
	position: PositionType,
	setPosition: (position: PositionType) => void,
	size: SizeType,
	setSize: (size: SizeType) => void,
	slideId: string,
	objectId: string,
}

type SquareType = {
	type: string,
	position: PositionType,
	cursor: string,
}

function ResizeFrame({
	parentRef,
	position,
	setPosition,
	size,
	setSize,
	slideId,
	objectId,
}: ResizeFrameProps) {
	const {
		changeObjectPosition,
		changeObjectSize,
	} = useAppActions()

	const [squares, setSquares] = useState<SquareType[]>([])

	useEffect(() => {
		setSquares(computeHandlePositions(position, size))
	}, [position, size])

	const onResize = useGetOnResize({
		position,
		setPosition,
		setSize,
		size,
	})

	const onResizeEnd = useCallback(() => {
		changeObjectSize({
			objId: objectId,
			slideId,
			size,
		})

		changeObjectPosition({
			id: objectId,
			position,
		})
	}, [changeObjectPosition, changeObjectSize, objectId, position, size, slideId])

	return (
		<>
			{squares.map(square => (
				<Square
					key={square.type}
					parentRef={parentRef}
					position={square.position}
					cursor={square.cursor}
					onResize={(delta: PositionType) => onResize(square.type, delta)}
					onResizeEnd={onResizeEnd}
				/>
			))}
		</>
	)
}

export {ResizeFrame}
