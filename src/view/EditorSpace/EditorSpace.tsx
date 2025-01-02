import {Canvas} from '../Canvas/Canvas'
import {useAppActions} from '../hooks/useAppActions'
import {useAppSelector} from '../hooks/useAppSelector'
import styles from './EditorSpace.module.css'

function EditorSpace() {
	const slides = useAppSelector((editor => editor.presentation.slides))
	const selectedSlideId = useAppSelector((editor => editor.selection.selectedSlideId))
	const {deselect} = useAppActions()
	const slide = slides.find(slide => slide.id === selectedSlideId)!
	return slide
		? (
			<div
				className={styles.space}
				onClick={
					e => {
						if (e.defaultPrevented) {
							return
						}
						deselect({type: 'object'})
						e.preventDefault()
					}
				}
			>
				<Canvas />
			</div>
		)
		: (
			<div className={styles.space} />
		)
}

export {EditorSpace}
