import {EditorType} from '../types'

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    SET_SLIDE_INDEX = 'setSlideIndex',

    SET_SELECTION = 'setSelection',
	DESELECT = 'deselect',

    ADD_TEXT = 'addText',
    ADD_PICTURE = 'addPicture',
    CHANGE_OBJECT_POSITION = 'changeObjectPosition',
    CHANGE_OBJECT_SIZE = 'changeObjectSize',

    SET_EDITOR = 'setEditor',
    CHANGE_NAME = 'changePresentationName'
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

type SetSlideIndexAction = {
    type: ActionType.SET_SLIDE_INDEX,
    payload: { id: string; index: number },
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: {
		type: 'slide' | 'object',
		id: string
	},
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type DeselectAction = {
	type: ActionType.DESELECT,
    payload: {type: 'slide' | 'object'},
}

type AddTextAction = {
    type: ActionType.ADD_TEXT,
}

type AddPictureAction = {
    type: ActionType.ADD_PICTURE,
}

type ChangePresentationNameAction = {
    type: ActionType.CHANGE_NAME,
    payload: {name: string}
}

type ChangeObjectPositionAction = {
    type: ActionType.CHANGE_OBJECT_POSITION,
    payload: {id: string, position: {x: number, y: number}}
}

type ChangeObjectSizeAction = {
    type: ActionType.CHANGE_OBJECT_SIZE,
    payload: { slideId: string; objId: string; size: {width: number, height: number} }
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

export {ActionType}
export type {
    SetSelectionAction,
    DeselectAction,
    EditorAction,
    SetSlideIndexAction,
    ChangePresentationNameAction,
    ChangeObjectPositionAction,
    ChangeObjectSizeAction,
}
