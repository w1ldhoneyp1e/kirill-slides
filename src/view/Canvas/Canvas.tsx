import { Slide } from '../../components/Slide/Slide'
import { useAppSelector } from '../hooks/useAppSelector'
import styles from './Canvas.module.css'

function Canvas() {
    const slides = useAppSelector((editor => editor.presentation.slides))
    const slideId = useAppSelector((editor => editor.selection.selectedSlideId))
    const slide = slideId
        ? slides.find(s => s.id === slideId)
        : undefined
    return (
        <div className={styles.canvas}>
            {slide
                ? <Slide slideId={slide.id} />
                : ''}
        </div>
    )
}

export { Canvas }
