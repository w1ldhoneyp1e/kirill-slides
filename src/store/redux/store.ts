import {
    applyMiddleware, legacy_createStore as createStore,
} from 'redux'
import { editorReducer } from './editorReducer'
import { saveToLocalStorage } from '../localStorage/saveToLocalStorage'
import { loadFromLocalStorage } from '../localStorage/loadFromLocalStorage'

const preloadedEditor = loadFromLocalStorage()

const store = createStore(
    editorReducer,
    preloadedEditor,
    applyMiddleware(saveToLocalStorage),
)

export {store}
