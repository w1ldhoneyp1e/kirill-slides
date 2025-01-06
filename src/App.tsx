import './App.css'
import {type HistoryType} from './utils/history'
import {HistoryContext} from './view/hooks/historyContext'
import {useUndoRedo} from './view/hooks/useUndoRedo'
import {TopPanel} from './view/TopPanel/TopPanel'
import {WorkSpace} from './view/WorkSpace/WorkSpace'

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
