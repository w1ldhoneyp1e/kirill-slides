import {
    useRef,
    useCallback,
    useState,
    useEffect,
} from 'react'
import { Slide } from '../../../components/Slide/Slide'
import {
    EditorType, PositionType, SlideType,
} from '../../../store/types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { dispatch } from '../../../store/editor'
import { changeSlideIndex } from '../../../store/methods'
import styles from './Shell.module.css'

const SLIDE_SCALE = 1 / 3

type ShellProps = {
    editor: EditorType
    onClick: () => void
    slide: SlideType
    parentRef: React.RefObject<HTMLDivElement>
}

function Shell({
    editor,
    slide,
    onClick,
    parentRef,
}: ShellProps) {
    const [onDrag, setOnDrag] = useState(false)
    const [targetIndex, setTargetIndex] = useState(editor.presentation.slides.findIndex((s) => s.id === slide.id))
    const slideRef = useRef<HTMLDivElement>(null)
    const gap = 30
    const heightRef = useRef(0)


    const onMouseUp = useCallback(() => {
        setOnDrag(false)
    }, [])

    const onMouseDown = useCallback(() => {
        setOnDrag(true)
    }, [])

    const delta = useDragAndDrop({
        ref: slideRef,
        parentRef,
        onMouseDown,
        onMouseUp,
    })

    useEffect(() => {
        if (slideRef.current) {
            heightRef.current = slideRef.current.getBoundingClientRect().height
        }
    }, [slideRef])

    useEffect(() => {
        const calculateTargetIndex = (delta: PositionType | null): number => {
            if (!delta || !heightRef.current) {
                return editor.presentation.slides.findIndex((s) => s.id === slide.id) // Return current index if no delta or height
            }

            const currentIndex = editor.presentation.slides.findIndex((s) => s.id === slide.id)
            const indexPositionY = (heightRef.current + gap) * currentIndex
            let newTargetIndex = currentIndex

            if (delta.y - indexPositionY > heightRef.current + gap) {
                newTargetIndex = currentIndex + 1
            } else if (delta.y - indexPositionY < -(heightRef.current + gap)) {
                newTargetIndex = currentIndex - 1
            }

            return newTargetIndex
        }
        const newTargetIndex = calculateTargetIndex(delta)
        if (newTargetIndex !== targetIndex) {
            setTargetIndex(newTargetIndex)
        }
    }, [delta, editor.presentation.slides, slide.id, targetIndex])


    useEffect(() => {
        if (
            targetIndex !== editor.presentation.slides.findIndex((s) => s.id === slide.id)
            && targetIndex >= 0
            && targetIndex < editor.presentation.slides.length
        ) {
            dispatch(changeSlideIndex, {
                slideId: slide.id,
                positionToMove: targetIndex,
            })
        }
    }, [targetIndex, editor.presentation.slides.length, slide.id, editor.presentation.slides])

    useEffect(() => {
        if (!slideRef.current || !parentRef.current || !delta) return
        const slideRect = slideRef.current.getBoundingClientRect()
        const parentRect = parentRef.current.getBoundingClientRect()

        if (slideRect.width + delta.x > parentRect.width) {
            slideRef.current.style.left = `${parentRect.width - slideRect.width}px`
        }

        if (delta.x < parentRect.x) {
            slideRef.current.style.left = `${parentRect.x}px`
        }
    }, [delta, parentRef])

    const style = onDrag && !!delta
        ? {
            cursor: 'pointer',
            position: 'absolute' as const,
            top: delta ? delta.y : 0,
            left: delta ? delta.x : 0,
            height: heightRef.current,
        }
        : {}

    return (
        <>
            {onDrag
            && (targetIndex === editor.presentation.slides.findIndex((s) => s.id === slide.id))
            && (
                <div
                    className={styles.placeholder}
                    style={{
                        height: heightRef.current,
                        width: '100%',
                        background: 'transparent',
                    }}
                />
            )}
            <div
                className={styles.shell}
                ref={slideRef}
                onClick={onClick}
                style={style}
            >
                <Slide
                    editor={editor}
                    slide={slide}
                    isSelected={slide.id === editor.selection.selectedSlideId}
                    scale={SLIDE_SCALE}
                />
            </div>
        </>
    )
}

export { Shell }
