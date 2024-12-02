import { EditorType } from '../types'
import { ActionType } from './actions'

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

function changePresentationName(name: string) {
    return {
        type: ActionType.SET_EDITOR,
        payload: {name: name},
    }
}

export {
    setEditor,
    changePresentationName,
}
