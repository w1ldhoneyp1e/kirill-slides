import {
    useRef, useEffect, 
} from 'react'

import { Slide } from '../../../components/Slide/Slide'
import {
    EditorType, SlideType, 
} from '../../../store/types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { dispatch } from '../../../store/editor'
import {
    changeSlidePosition, changeSlideIndex, 
} from '../../../store/methods'

import styles from './Shell.module.css'

const SLIDE_SCALE = 1 / 3

type ShellProps = {
	editor: EditorType
	onClick: () => void
	slide: SlideType
}

function Shell({
    editor, onClick, slide, 
}: ShellProps) {
    const slideRef = useRef<HTMLDivElement>(null)
    const gap = 30
    const index = editor.presentation.slides.findIndex((s) => s.id === slide.id)
    const height = slideRef.current
        ? slideRef.current.getBoundingClientRect().height
        : 0
    const indexPositionY = (height + gap) * index

    useDragAndDrop(slideRef, changeSlidePosition, slide.id)

    // Высчитываем дельту и потенциальный целевой индекс
    useEffect(() => {
        const delta = slide.position ? slide.position.y - indexPositionY : 0
        let targetIndex = index

        if (delta > height + gap) {
            targetIndex = targetIndex + 1
        } else if (delta < (height + gap) / -2) {
            targetIndex = targetIndex - 1
        }

        // Перемещаем слайд, если целевой индекс изменился
        if (
            targetIndex !== index &&
			targetIndex >= 0 &&
			targetIndex < editor.presentation.slides.length
        ) {
            dispatch(changeSlideIndex, {
                slideId: slide.id,
                positionToMove: targetIndex,
            })
        }
    }, [
        slide.position, index, height, indexPositionY, editor.presentation.slides.length,
    ])

    return (
        <div
            className={styles.shell}
            ref={slideRef}
            onClick={onClick}
            style={{
                cursor: 'pointer',
                position: slide.position ? 'absolute' : 'static',
                top: slide.position ? `${slide.position.y}px` : 'auto',
                left: slide.position ? `${slide.position.x}px` : 'auto',
                height: `${height}px`,
            }}
        >
            <Slide
                editor={editor}
                slide={slide}
                isSelected={slide.id === editor.selection.selectedSlideId}
                scale={SLIDE_SCALE}
            />
        </div>
    )
}

export { Shell }
