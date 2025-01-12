import {type HistoryType} from '../../utils/history'
import {HistoryContext} from '../hooks/historyContext'
import {useUndoRedo} from '../hooks/useUndoRedo'
import {TopPanel} from '../TopPanel/TopPanel'
import {WorkSpace} from '../WorkSpace/WorkSpace'

type PresentationEditorProps = {
	history: HistoryType,
}

function PresentationEditor({
	history,
}: PresentationEditorProps) {
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

export {
	PresentationEditor,
}
