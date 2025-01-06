import {useCallback, useContext} from 'react'
import {AddText24px} from '../../../../assets/AddText24px.tsx'
import {Cursor24px} from '../../../../assets/Cursor24px.tsx'
import {Plus24px} from '../../../../assets/Plus24px.tsx'
import {Redo24px} from '../../../../assets/Redo24px.tsx'
import {Undo24px} from '../../../../assets/Undo24px.tsx'
import {type ButtonProps} from '../../../../components/Button/Button.tsx'
import {HistoryContext} from '../../../hooks/historyContext.ts'
import {useAppActions} from '../../../hooks/useAppActions.ts'

function useGetButtons() {
	const {
		addSlide, addText, setEditor,
	} = useAppActions()
	const history = useContext(HistoryContext)

	const onUndo = useCallback(() => {
		const newEditor = history.undo()
		if (newEditor) {
			setEditor(newEditor)
		}
	}, [history, setEditor])

	const onRedo = useCallback(() => {
		const newEditor = history.redo()
		if (newEditor) {
			setEditor(newEditor)
		}
	}, [history, setEditor])

	const addButton: ButtonProps = {
		type: 'icon',
		state: 'default',
		icon: Plus24px,
		onClick: addSlide,
	}

	const undoButton: ButtonProps = {
		type: 'icon',
		icon: Undo24px,
		state: history.undo()
			? 'default'
			: 'disabled',
		onClick: onUndo,
	}

	const redoButton: ButtonProps = {
		type: 'icon',
		icon: Redo24px,
		state: history.redo()
			? 'default'
			: 'disabled',
		onClick: onRedo,
	}

	const cursorButton: ButtonProps = {
		type: 'icon',
		icon: Cursor24px,
		state: 'default',
		onClick: () => {},
	}

	const addTextButton: ButtonProps = {
		type: 'icon',
		icon: AddText24px,
		state: 'default',
		onClick: addText,
	}


	const backgroundButton: ButtonProps = {
		type: 'text',
		text: 'Background',
		state: 'default',
		onClick: () => {},
	}

	return {
		addButton,
		undoButton,
		redoButton,
		cursorButton,
		addTextButton,
		backgroundButton,
	}
}

export {
	useGetButtons,
}
