import {type PositionType, type SizeType} from '../../../store/types'
import {RESIZE_HANDLES} from './resizeHandles'

const SQUARE_SIZE = 8

function computeHandlePositions(position: PositionType, size: SizeType) {
	return RESIZE_HANDLES.map(({type, cursor}) => {
		const _position: PositionType = {
			x: 0,
			y: 0,
		}

		if (type.includes('top')) {
			_position.y = position.y - SQUARE_SIZE
		}
		else if (type.includes('bottom')) {
			_position.y = position.y + size.height
		}
		else {
			_position.y = position.y + size.height / 2 - SQUARE_SIZE / 2
		}

		if (type.includes('left')) {
			_position.x = position.x - SQUARE_SIZE
		}
		else if (type.includes('right')) {
			_position.x = position.x + size.width
		}
		else {
			_position.x = position.x + size.width / 2 - SQUARE_SIZE / 2
		}

		return {
			type,
			position: _position,
			cursor,
		}
	})
}

export {
	computeHandlePositions,
}
