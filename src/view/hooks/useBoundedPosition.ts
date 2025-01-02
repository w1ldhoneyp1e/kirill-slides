import {useEffect, useState} from 'react'
import {type PositionType} from '../../store/types'

function useBoundedPosition(
	position: PositionType,
	parentRef: React.RefObject<HTMLDivElement>,
	textRef: React.RefObject<HTMLDivElement>,
): PositionType {
	const [boundedPosition, setBoundedPosition] = useState<PositionType>(position)

	useEffect(() => {
		if (!parentRef.current || !textRef.current) {
			return
		}

		const parentRect = parentRef.current.getBoundingClientRect()
		const textRect = textRef.current.getBoundingClientRect()

		const newPosition = {...position}

		if (newPosition.x < 0) {
			newPosition.x = 0
		}
		if (newPosition.x + textRect.width > parentRect.width) {
			newPosition.x = parentRect.width - textRect.width
		}

		if (newPosition.y < 0) {
			newPosition.y = 0
		}
		if (newPosition.y + textRect.height > parentRect.height) {
			newPosition.y = parentRect.height - textRect.height
		}

		if (newPosition.x !== boundedPosition.x || newPosition.y !== boundedPosition.y) {
			setBoundedPosition(newPosition)
		}
	}, [position, parentRef, textRef, boundedPosition])

	return boundedPosition
}

export {useBoundedPosition}
