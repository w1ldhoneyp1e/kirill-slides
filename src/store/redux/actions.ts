import {type EditorType} from '../types'

enum ACTION_TYPE {
	addSlide = 'addSlide',
	deleteSlide = 'deleteSlide',
	setSlideIndex = 'setSlideIndex',
	changeSlideBackground = 'changeSlideBackground',

	setSelection = 'setSelection',
	deselect = 'deselect',

	addText = 'addText',
	changeTextValue = 'changeTextValue',
	changeTextFontSize = 'changeTextFontSize',
	changeTextFontColor = 'changeTextFontColor',
	changeTextFontFamily = 'changeTextFontFamily',

	addPicture = 'addPicture',
	deleteObjects = 'deleteObjects',
	changeObjectPosition = 'changeObjectPosition',
	changeObjectSize = 'changeObjectSize',

	setEditor = 'setEditor',
	changeName = 'changePresentationName',
}

type AddSlideAction = {
	type: ACTION_TYPE.addSlide,
}

type RemoveSlideAction = {
	type: ACTION_TYPE.deleteSlide,
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
	payload: {
		src: string,
		width: number,
		height: number,
	},
}

type DeleteObjectsAction = {
	type: ACTION_TYPE.deleteObjects,
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

type ChangeTextValueAction = {
	type: ACTION_TYPE.changeTextValue,
	payload: {
		slideId: string,
		objId: string,
		value: string,
	},
}

type ChangeTextFontSizeAction = {
	type: ACTION_TYPE.changeTextFontSize,
	payload: {
		slideId: string,
		objId: string,
		fontSize: number,
	},
}

type ChangeTextFontColorAction = {
	type: ACTION_TYPE.changeTextFontColor,
	payload: {
		slideId: string,
		objId: string,
		fontColor: string,
	},
}

type ChangeSlideBackgroundAction = {
	type: ACTION_TYPE.changeSlideBackground,
	payload: {
		value: string,
		type: 'solid' | 'image',
	},
}

type ChangeTextFontFamilyAction = {
	type: ACTION_TYPE.changeTextFontFamily,
	payload: {
		slideId: string,
		objId: string,
		fontFamily: string,
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
	| ChangeTextValueAction
	| ChangeTextFontSizeAction
	| ChangeTextFontColorAction
	| ChangeSlideBackgroundAction
	| DeleteObjectsAction
	| ChangeTextFontFamilyAction

export {ACTION_TYPE}
export type {
	SetSelectionAction,
	DeselectAction,
	EditorAction,
	SetSlideIndexAction,
	ChangePresentationNameAction,
	ChangeObjectPositionAction,
	ChangeObjectSizeAction,
	AddPictureAction,
	ChangeTextValueAction,
	ChangeTextFontSizeAction,
	ChangeTextFontColorAction,
	ChangeSlideBackgroundAction,
	AddSlideAction,
	RemoveSlideAction,
	AddTextAction,
	SetEditorAction,
	DeleteObjectsAction,
	ChangeTextFontFamilyAction,
}
