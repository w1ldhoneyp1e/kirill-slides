import {ActionType} from './actions'

function addText() {
	return {type: ActionType.ADD_TEXT}
}

function addPicture() {
	return {type: ActionType.ADD_PICTURE}
}

function changeObjectPosition({
	id,
	position,
}: {
	id: string,
	position: {
		x: number,
		y: number,
	},
}) {
	return {
		type: ActionType.CHANGE_OBJECT_POSITION,
		payload: {
			id,
			position: {
				x: position.x,
				y: position.y,
			},
		},
	}
}

function changeObjectSize({
	slideId,
	objId,
	size,
}: {
	slideId: string,
	objId: string,
	size: {
		width: number,
		height: number,
	},
}) {
	return {
		type: ActionType.CHANGE_OBJECT_SIZE,
		payload: {
			slideId,
			objId,
			size: {
				width: size.width,
				height: size.height,
			},
		},
	}
}

export {
	addText,
	addPicture,
	changeObjectPosition,
	changeObjectSize,
}
