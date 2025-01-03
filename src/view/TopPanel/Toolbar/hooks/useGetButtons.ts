import {useCallback, useContext} from 'react'
import {AddText24px} from '../../../../assets/AddText24px.tsx'
import {Cursor24px} from '../../../../assets/Cursor24px.tsx'
import {Plus24px} from '../../../../assets/Plus24px.tsx'
import {Redo24px} from '../../../../assets/Redo24px.tsx'
import {Undo24px} from '../../../../assets/Undo24px.tsx'
import {type ButtonProps} from '../../../../components/Button/Button.tsx'
import {HistoryContext} from '../../../hooks/heistoryContext.ts'
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
		icon: Plus24px,
		onClick: addSlide,
	}

	const undoButton: ButtonProps = {
		type: 'icon',
		icon: Undo24px,
		onClick: onUndo,
		disable: !history.undo(),
	}

	const redoButton: ButtonProps = {
		type: 'icon',
		icon: Redo24px,
		onClick: onRedo,
		disable: !history.redo(),
	}

	const cursorButton: ButtonProps = {
		type: 'icon',
		icon: Cursor24px,
		onClick: () => {},
	}

	const addTextButton: ButtonProps = {
		type: 'icon',
		icon: AddText24px,
		onClick: addText,
	}


	const backgroundButton: ButtonProps = {
		type: 'text',
		text: 'Background',
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
