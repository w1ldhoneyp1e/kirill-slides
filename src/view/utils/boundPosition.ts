import {type PositionType} from '../../store/types'

function boundPosition(
	position: PositionType,
	parentRef: React.RefObject<HTMLDivElement>,
	textRef: React.RefObject<HTMLDivElement>,
): PositionType {
	if (!parentRef.current || !textRef.current) {
		return {...position}
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

	if (newPosition.x !== position.x || newPosition.y !== position.y) {
		return {...newPosition}
	}

	return {...position}
}

export {
	boundPosition,
}
