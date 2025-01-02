import {applyMiddleware, legacy_createStore as createStore} from 'redux'
import {loadFromLocalStorage} from '../localStorage/loadFromLocalStorage'
import {saveToLocalStorage} from '../localStorage/saveToLocalStorage'
import {editorReducer} from './editorReducer'

const preloadedEditor = loadFromLocalStorage()

const store = createStore(
	editorReducer,
	preloadedEditor,
	applyMiddleware(saveToLocalStorage),
)

export {store}
