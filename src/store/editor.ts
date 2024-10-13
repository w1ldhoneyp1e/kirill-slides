/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { getDefaultBackground, getUID } from "./methods";
import { Editor, Presentation, Slide } from "./types";

const slides: Slide[] = [
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
    {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    },
]

const myPres: Presentation = {
    id: getUID(),
    name: 'New Presentation',
    slides: slides
}

let editor: Editor = {
    presentations: [myPres],
    currentPresentationId: myPres.id
}
let editorChangeHandler: Function | null = null;

function getEditor() {
    return editor;
}

function setEditor(newEditor: Editor) {
    editor = newEditor;
}

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler;
}

function dispatch(modifyFn: Function, payload: object) {
    const newEditor = modifyFn(payload);
    setEditor(newEditor);
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

export {
    getEditor,
    setEditor,
    dispatch,
    addEditorChangeHandler,
}