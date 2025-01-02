import './App.css'
import { WorkSpace } from './view/WorkSpace/WorkSpace'
import { TopPanel } from './view/TopPanel/TopPanel'
import { HistoryType } from './utils/history'
import { HistoryContext } from './view/hooks/heistoryContext'
import { useUndoRedo } from './view/hooks/useUndoRedo'

type AppProps = {
    history: HistoryType,
}

function App({history}: AppProps) {
    useUndoRedo(history)
    return (
        <HistoryContext.Provider value={history}>
            <div>
                <TopPanel />
                <WorkSpace />
            </div>
        </HistoryContext.Provider>
    )
}

export default App
