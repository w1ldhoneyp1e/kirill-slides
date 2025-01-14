import {useCallback, useContext} from 'react'
import {AddPlus24px} from '../../../../assets/icons/AddPlus24px.tsx'
import {AddText24px} from '../../../../assets/icons/AddText24px.tsx'
import {Cursor24px} from '../../../../assets/icons/Cursor24px.tsx'
import {Fill24px} from '../../../../assets/icons/Fill24px.tsx'
import {Redo24px} from '../../../../assets/icons/Redo24px.tsx'
import {Undo24px} from '../../../../assets/icons/Undo24px.tsx'
import {type ButtonProps} from '../../../../components/Button/Button.tsx'
import {HistoryContext} from '../../../hooks/historyContext.ts'
import {useAppActions} from '../../../hooks/useAppActions.ts'
import {useAppSelector} from '../../../hooks/useAppSelector.ts'

function useGetButtons() {
	const {
		addSlide,
		addText,
		setEditor,
		deselect,
	} = useAppActions()
	const selection = useAppSelector(editor => editor.selection)
	const history = useContext(HistoryContext)

	const selectedSlide = selection.selectedSlideId
	const selectedObjects = selection.selectedObjIds

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
		icon: AddPlus24px,
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
		state: selectedObjects.length
			? 'default'
			: 'disabled',
		onClick: () => deselect({
			type: 'object',
		}),
	}

	const addTextButton: ButtonProps = {
		type: 'icon',
		icon: AddText24px,
		state: selectedSlide
			? 'default'
			: 'disabled',
		onClick: addText,
	}


	const backgroundButton: ButtonProps = {
		type: 'icon',
		icon: Fill24px,
		state: selectedSlide
			? 'default'
			: 'disabled',
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
