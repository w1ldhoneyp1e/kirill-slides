import {Slide} from '../../components/Slide/Slide'
import {useAppSelector} from '../hooks/useAppSelector'
import styles from './Canvas.module.css'

function Canvas() {
	const slides = useAppSelector((editor => editor.presentation.slides))
	const slideId = useAppSelector((editor => editor.selection.selectedSlideId))
	const slide = slides.find(s => s.id === slideId)
	return (
		<div className={styles.canvas}>
			{slide
				? <Slide slide={slide} />
				: ''}
		</div>
	)
}

export {Canvas}
