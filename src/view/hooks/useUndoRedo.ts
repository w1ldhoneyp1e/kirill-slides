import {useEffect} from 'react'
import {type HistoryType} from '../../utils/history'
import {useAppActions} from './useAppActions'

const useUndoRedo = (history: HistoryType) => {
	const {setEditor} = useAppActions()
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const isMac = navigator.userAgent.includes('Mac OS X')
			const isUndo = isMac
				? event.metaKey && event.key === 'z' && !event.shiftKey
				: event.ctrlKey && event.key === 'z' && !event.shiftKey

			const isRedo = isMac
				? event.metaKey && event.shiftKey && event.code === 'KeyZ'
				: event.ctrlKey && event.shiftKey && event.code === 'KeyZ'

			if (isUndo) {
				event.preventDefault()
				const newEditor = history.undo()
				if (newEditor) {
					setEditor(newEditor)
				}
			}

			if (isRedo) {
				event.preventDefault()
				const newEditor = history.redo()
				if (newEditor) {
					setEditor(newEditor)
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [history, setEditor])
}

export {useUndoRedo}
