/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
    getDefaultBackground, getUID,
} from './methods'
import {
    EditorType, PresentationType, SlideType,
} from './types'

const slides: SlideType[] = [
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground(),
        position: null,
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground(),
        position: null,
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground(),
        position: null,
    },
]

const myPres: PresentationType = {
    id: getUID(),
    name: 'Новая презентация',
    slides: slides,
}

let editor: EditorType = {
    presentation: myPres,
    selection: {
        selectedSlideId: '',
        selectedObjIds: [],
    },
}
let editorChangeHandler: Function | null = null

function getEditor() {
    return editor
}

function setEditor(newEditor: EditorType) {
    editor = newEditor
}

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler
}

function dispatch(modifyFn: Function, payload?: object) {
    const newEditor = modifyFn(editor, payload)
    setEditor(newEditor)
    if (editorChangeHandler) {
        editorChangeHandler()
    }
}

export {
    getEditor, setEditor, dispatch, addEditorChangeHandler,
}
