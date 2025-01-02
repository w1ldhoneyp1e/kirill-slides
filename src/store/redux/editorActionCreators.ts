import {type EditorType} from '../types'
import {type EditorAction, ActionType} from './actions'

function setEditor(newEditor: EditorType): EditorAction {
	return {
		type: ActionType.SET_EDITOR,
		payload: newEditor,
	}
}

function changePresentationName(name: string) {
	return {
		type: ActionType.CHANGE_NAME,
		payload: {name},
	}
}

export {
	setEditor,
	changePresentationName,
}
