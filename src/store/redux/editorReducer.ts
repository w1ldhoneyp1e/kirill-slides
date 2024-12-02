import { defaultEditor } from '../data'
import {
    addSlide,
    setSlideIndex,
    deleteSlide,
    setSelection,
    deselect,
    addText,
    addPicture,
    changePresentationName,
    changeObjectPosition,
} from '../methods'
import { EditorType } from '../types'
import {
    ActionType, EditorAction,
} from './actions'

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
    case ActionType.ADD_SLIDE:
        return addSlide(editor)
    case ActionType.REMOVE_SLIDE:
        return deleteSlide(editor)
    case ActionType.SET_SLIDE_INDEX:
        return setSlideIndex(editor, action)
    case ActionType.SET_SELECTION:
        return setSelection(editor, action)
    case ActionType.SET_EDITOR:
        return action.payload
    case ActionType.DESELECT:
        return deselect(editor, action)
    case ActionType.ADD_TEXT:
        return addText(editor)
    case ActionType.ADD_PICTURE:
        return addPicture(editor)
    case ActionType.CHANGE_NAME:
        return changePresentationName(editor, action)
    case ActionType.CHANGE_OBJECT_POSITION:
        return changeObjectPosition(editor, action)
    default:
        return editor
    }
}

export {editorReducer}
