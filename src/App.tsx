import './App.css'
import { WorkSpace } from './view/WorkSpace/WorkSpace'
import { TopPanel } from './view/TopPanel/TopPanel'
import { HistoryType } from './utils/history'
import { HistoryContext } from './view/hooks/heistoryContext'

type AppProps = {
    history: HistoryType,
}

function App({history}: AppProps) {
    console.log(history)

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
