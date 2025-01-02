import {ACTION_TYPE} from './actions'

function addText() {
	return {type: ACTION_TYPE.addText}
}

function addPicture() {
	return {type: ACTION_TYPE.addPicture}
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
		type: ACTION_TYPE.changeObjectPosition,
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
		type: ACTION_TYPE.changeObjectSize,
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
