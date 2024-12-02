import { EditorType } from '../types'
import {
    ActionType, EditorAction,
} from './actions'

function setEditor(newEditor: EditorType): EditorAction {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

function changePresentationName(name: string) {
    return {
        type: ActionType.CHANGE_NAME,
        payload: {name: name},
    }
}

export {
    setEditor,
    changePresentationName,
}
