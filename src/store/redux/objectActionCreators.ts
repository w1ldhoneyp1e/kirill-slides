import {ACTION_TYPE} from './actions'

function addText() {
	return {type: ACTION_TYPE.addText}
}

function addPicture({
	src,
	width,
	height,
}: {
	src: string,
	width: number,
	height: number,
}) {
	return {
		type: ACTION_TYPE.addPicture,
		payload: {
			src,
			width,
			height,
		},
	}
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
			position: {...position},
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
			size: {...size},
		},
	}
}

function changeTextValue({
	slideId,
	objId,
	value,
}: {
	slideId: string,
	objId: string,
	value: string,
}) {
	return {
		type: ACTION_TYPE.changeTextValue,
		payload: {
			slideId,
			objId,
			value,
		},
	}
}

function changeTextFontSize({
	slideId,
	objId,
	fontSize,
}: {
	slideId: string,
	objId: string,
	fontSize: number,
}) {
	return {
		type: ACTION_TYPE.changeTextFontSize,
		payload: {
			slideId,
			objId,
			fontSize,
		},
	}
}

function changeTextFontColor({
	slideId,
	objId,
	fontColor,
}: {
	slideId: string,
	objId: string,
	fontColor: string,
}) {
	return {
		type: ACTION_TYPE.changeTextFontColor,
		payload: {
			slideId,
			objId,
			fontColor,
		},
	}
}

export {
	addText,
	addPicture,
	changeObjectPosition,
	changeObjectSize,
	changeTextValue,
	changeTextFontSize,
	changeTextFontColor,
}
