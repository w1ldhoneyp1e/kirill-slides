import React, {useEffect, useState} from 'react'
import {type PositionType, type SizeType} from '../../store/types'
import {useGetOnResize} from './hooks/useGetOnResize'
import {useGetOnResizeEnd} from './hooks/useGetOnResizeEnd'
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

	const onResizeEnd = useGetOnResizeEnd({
		position,
		size,
		objectId,
		slideId,
	})

	return (
		<>
			{squares.map(square => (
				<Square
					key={square.type}
					parentRef={parentRef}
					position={square.position}
					cursor={square.cursor}
					onResize={(delta: PositionType) => onResize(square.type, delta)}
					onResizeEnd={(delta: PositionType) => onResizeEnd(square.type, delta)}
				/>
			))}
		</>
	)
}

export {ResizeFrame}
