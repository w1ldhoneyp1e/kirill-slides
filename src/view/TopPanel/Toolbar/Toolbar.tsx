import React, {useCallback} from 'react'
import {AddPicture24px} from '../../../assets/AddPicture24px.tsx'
import {AddText24px} from '../../../assets/AddText24px.tsx'
import {Cursor24px} from '../../../assets/Cursor24px.tsx'
import {Plus24px} from '../../../assets/Plus24px.tsx'
import {Redo24px} from '../../../assets/Redo24px.tsx'
import {Undo24px} from '../../../assets/Undo24px.tsx'
import {type ButtonProps} from '../../../components/Button/Button.tsx'
import {ButtonGroup} from '../../../components/ButtonGroup/ButtonGroup.tsx'
import {Divider} from '../../../components/Divider/Divider.tsx'
import {HistoryContext} from '../../hooks/heistoryContext.ts'
import {useAppActions} from '../../hooks/useAppActions.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import styles from './Toolbar.module.css'

function Toolbar() {
	const slides = useAppSelector((editor => editor.presentation.slides))
	const selectedSlideId = useAppSelector((editor => editor.selection.selectedSlideId))
	const {
		addSlide, addText, addPicture, setEditor,
	} = useAppActions()
	const thisSlide = slides.find(slide => slide.id === selectedSlideId)!
	const background = thisSlide
		? thisSlide.background
		: null
	const value = background?.type === 'solid'
		? background?.hexColor
		: background?.src

	const history = React.useContext(HistoryContext)

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

	const addImageButton: ButtonProps = {
		type: 'icon',
		icon: AddPicture24px,
		onClick: addPicture,
	}

	const backgroundButton: ButtonProps = {
		type: 'text',
		text: 'Background',
		onClick: () => {},
	}
	return (
		<div className={styles.toolBar}>
			<ButtonGroup
				items={[addButton]}
			/>
			<Divider
				type="vertical"
				size="half"
			/>
			<ButtonGroup
				items={[
					undoButton, redoButton,
				]}
			/>
			<Divider
				type="vertical"
				size="half"
			/>
			<ButtonGroup
				items={[cursorButton, addTextButton, addImageButton]}
			/>
			<Divider
				size="half"
				type="vertical"
			/>
			<ButtonGroup
				items={[backgroundButton]}
			/>
		</div>
	// <input
	//     type="color"
	//     value={value ?? '#FFFFFF'}
	//     onChange={(e) =>
	//         dispatch(changeSlideBackground, {
	//             value: e.target.value,
	//             type: 'solid',
	//         })
	//     }
	//     className={styles.colorpicker}
	// />
	)
}
export {Toolbar}
