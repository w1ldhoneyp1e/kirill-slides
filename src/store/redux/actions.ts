import {type EditorType} from '../types'

enum ACTION_TYPE {
	addSlide = 'addSlide',
	removeSlide = 'removeSlide',
	setSlideIndex = 'setSlideIndex',

	setSelection = 'setSelection',
	deselect = 'deselect',

	addText = 'addText',
	addPicture = 'addPicture',
	changeObjectPosition = 'changeObjectPosition',
	changeObjectSize = 'changeObjectSize',

	setEditor = 'setEditor',
	changeName = 'changePresentationName',
}

type AddSlideAction = {
	type: ACTION_TYPE.addSlide,
}

type RemoveSlideAction = {
	type: ACTION_TYPE.removeSlide,
}

type SetSlideIndexAction = {
	type: ACTION_TYPE.setSlideIndex,
	payload: {
		id: string,
		index: number,
	},
}

type SetSelectionAction = {
	type: ACTION_TYPE.setSelection,
	payload: {
		type: 'slide' | 'object',
		id: string,
	},
}

type SetEditorAction = {
	type: ACTION_TYPE.setEditor,
	payload: EditorType,
}

type DeselectAction = {
	type: ACTION_TYPE.deselect,
	payload: {type: 'slide' | 'object'},
}

type AddTextAction = {
	type: ACTION_TYPE.addText,
}

type AddPictureAction = {
	type: ACTION_TYPE.addPicture,
}

type ChangePresentationNameAction = {
	type: ACTION_TYPE.changeName,
	payload: {name: string},
}

type ChangeObjectPositionAction = {
	type: ACTION_TYPE.changeObjectPosition,
	payload: {
		id: string,
		position: {
			x: number,
			y: number,
		},
	},
}

type ChangeObjectSizeAction = {
	type: ACTION_TYPE.changeObjectSize,
	payload: {
		slideId: string,
		objId: string,
		size: {
			width: number,
			height: number,
		},
	},
}

type EditorAction =
    AddSlideAction
    | RemoveSlideAction
    | SetSelectionAction
    | SetEditorAction
    | DeselectAction
    | SetSlideIndexAction
    | AddTextAction
    | AddPictureAction
    | ChangePresentationNameAction
    | ChangeObjectPositionAction
    | ChangeObjectSizeAction

export {ACTION_TYPE}
export type {
	SetSelectionAction,
	DeselectAction,
	EditorAction,
	SetSlideIndexAction,
	ChangePresentationNameAction,
	ChangeObjectPositionAction,
	ChangeObjectSizeAction,
}
