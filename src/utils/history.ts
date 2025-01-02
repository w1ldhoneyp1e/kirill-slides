import {type Store} from 'redux'
import {type EditorType} from '../store/types'

type HistoryType = {
	undo: () => EditorType | undefined,
	redo: () => EditorType | undefined,
}

function getLastItem(stack: EditorType[]): EditorType {
	return stack[stack.length - 1]
}

function initHistory(store: Store<EditorType>): HistoryType {
	const undoStack: EditorType[] = []
	let redoStack: EditorType[] = []

	let previousEditor = store.getState()

	store.subscribe(() => {
		const editor = store.getState()
		if (editor.presentation === previousEditor.presentation) {
			return
		}
		if (!undoStack.length || previousEditor.presentation != editor.presentation) {
			if (editor == getLastItem(undoStack)) {
				undoStack.pop()
				redoStack.push(previousEditor)
			}
			else if (editor == getLastItem(redoStack)) {
				redoStack.pop()
				undoStack.push(previousEditor)
			}
			else {
				undoStack.push(previousEditor)
				redoStack = []
			}
		}
		previousEditor = editor
	})

	function undo() {
		return getLastItem(undoStack)
	}

	function redo() {
		return getLastItem(redoStack)
	}

	return {
		undo,
		redo,
	}
}

export {
	type HistoryType,
	initHistory,
}
