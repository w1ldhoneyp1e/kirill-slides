import {type PositionType} from '../store/types'

function isValidOffset(delta: PositionType | null) {
	return delta && (Math.abs(delta.x) > 0 || Math.abs(delta.y) > 0)
}

export {
	isValidOffset,
}
