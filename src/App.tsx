import './App.css'
import { WorkSpace } from './view/WorkSpace/WorkSpace'
import { EditorType } from './store/types'
import { TopPanel } from './view/TopPanel/TopPanel'
import { saveToLocalStorage } from './store/localStorage/saveToLocalStorage'

type AppProps = {
	editor: EditorType
}

function App({ editor }: AppProps) {
    saveToLocalStorage(editor)
    return (
        <div>
            <TopPanel editor={editor} />
            <WorkSpace editor={editor} />
        </div>
    )
}

export default App
