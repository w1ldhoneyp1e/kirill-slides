import { Slide } from '../../components/Slide/Slide'
import { EditorType, SlideType } from '../../store/types'
import styles from './Canvas.module.css'

type CanvasProps = {
	editor: EditorType
	slide: SlideType
}

function Canvas({ editor, slide }: CanvasProps) {
	return (
		<div className={styles.canvas}>
			<Slide editor={editor} slide={slide}></Slide>
		</div>
	)
}

export { Canvas }
