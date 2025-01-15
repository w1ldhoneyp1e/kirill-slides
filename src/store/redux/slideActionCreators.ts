import {ACTION_TYPE} from './actions'

function addSlide() {
	return {type: ACTION_TYPE.addSlide}
}

function removeSlide() {
	return {type: ACTION_TYPE.removeSlide}
}

function setSlideIndex(payload: {
	id: string,
	index: number,
}) {
	return {
		type: ACTION_TYPE.setSlideIndex,
		payload,
	}
}

function changeSlideBackground(payload: {
	value: string,
	type: 'solid' | 'image',
}) {
	return {
		type: ACTION_TYPE.changeSlideBackground,
		payload,
	}
}

export {
	addSlide,
	removeSlide,
	setSlideIndex,
	changeSlideBackground,
}
