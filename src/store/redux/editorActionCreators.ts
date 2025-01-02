import {type EditorType} from '../types'
import {type EditorAction, ACTION_TYPE} from './actions'

function setEditor(newEditor: EditorType): EditorAction {
	return {
		type: ACTION_TYPE.setEditor,
		payload: newEditor,
	}
}

function changePresentationName(name: string) {
	return {
		type: ACTION_TYPE.changeName,
		payload: {name},
	}
}

export {
	setEditor,
	changePresentationName,
}
