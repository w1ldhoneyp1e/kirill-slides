import { dispatch } from '../../store/editor'
import { deselectObjects } from '../../store/methods'
import { EditorType } from '../../store/types'
import { Canvas } from '../Canvas/Canvas'
import styles from './EditorSpace.module.css'

type EditorSpaceProps = {
	editor: EditorType
}

function EditorSpace({ editor }: EditorSpaceProps) {
	const slide = editor.presentation.slides.find(
		(slide) => slide.id === editor.selection.selectedSlideId
	)!
	return slide ? (
		<div className={styles.space} onMouseDown={() => dispatch(deselectObjects)}>
			<Canvas editor={editor} slide={slide}></Canvas>
		</div>
	) : (
		<div className={styles.space}></div>
	)
}

export { EditorSpace }
