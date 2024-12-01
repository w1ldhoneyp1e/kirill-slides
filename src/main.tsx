import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'
import {
    addEditorChangeHandler,
    getEditor,
    setEditor,
} from './store/editor'
import { loadFromLocalStorage } from './store/localStorage/methods'

const getEditorFromLocalStorage = () => {
    const savedEditor = loadFromLocalStorage()
    if (savedEditor) {
        setEditor(savedEditor)
    }
}

const root = createRoot(document.getElementById('root')!)

const render = () => {
    root.render(<StrictMode>
        <App editor={getEditor()} />
    </StrictMode>)
}

getEditorFromLocalStorage()
addEditorChangeHandler(render)
render()
