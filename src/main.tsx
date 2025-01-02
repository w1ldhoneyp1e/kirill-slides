import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './store/redux/store.ts'
import App from './App'
import './index.css'
import {loadFromLocalStorage} from './store/localStorage/loadFromLocalStorage'
import {setEditor} from './store/redux/editorActionCreators.ts'
import {initHistory} from './utils/history.ts'

const getEditorFromLocalStorage = () => {
	const savedEditor = loadFromLocalStorage()
	if (savedEditor) {
		setEditor(savedEditor)
	}
}

const root = createRoot(document.getElementById('root')!)

const render = () => {
	root.render(
		<StrictMode>
			<Provider store={store}>
				<App history={initHistory(store)} />
			</Provider>
		</StrictMode>,
	)
}

getEditorFromLocalStorage()
render()
