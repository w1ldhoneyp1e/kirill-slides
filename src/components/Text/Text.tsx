import {
    useRef, useCallback,
    useState,
    useMemo,
} from 'react'
import {
    TextType, PositionType,
    SizeType,
} from '../../store/types'
import { useDragAndDrop } from '../../view/hooks/useDragAndDrop'
import { useBoundedPosition } from '../../view/hooks/useBoundedPosition'  // Импортируем кастомный хук
import styles from './Text.module.css'
import { ResizeFrame } from '../ResizeFrame/ResizeFrame'
import { useAppSelector } from '../../view/hooks/useAppSelector'
import { useAppActions } from '../../view/hooks/useAppActions'

type TextProps = {
    text: TextType
    parentRef: React.RefObject<HTMLDivElement>
    scale: number
    onResize: (objId: string, size: SizeType) => void
}

function Text({
    text,
    parentRef,
    scale,
    onResize,
}: TextProps) {
    const textRef = useRef<HTMLDivElement>(null)
    const [isResizing, setIsResizing] = useState(false) // Состояние для отслеживания изменения размера

    const selectedObjIds = useAppSelector((editor => editor.selection.selectedObjIds))
    const {
        setSelection, changeObjectPosition,
    } = useAppActions()

    const isSelected = useMemo(
        () => selectedObjIds.includes(text.id),
        [selectedObjIds, text.id],
    )

    const dispatchFn = useCallback(
        (position: PositionType) => {
            if (!isResizing) { // Если не в процессе изменения размера, обновляем позицию
                changeObjectPosition({
                    id: text.id,
                    position: position,
                })
            }
        },
        [isResizing, changeObjectPosition, text.id],
    )

    const updatedPosition = useDragAndDrop({
        ref: textRef,
        parentRef,
        onMouseUp: dispatchFn,
    })

    const boundedPosition = useBoundedPosition({
        x: updatedPosition
        && !isResizing
            ? updatedPosition.x * scale
            : text.position.x * scale,
        y: updatedPosition
        && !isResizing
            ? updatedPosition.y * scale
            : text.position.y * scale,
    }, parentRef, textRef)

    const style = {
        top: boundedPosition.y,
        left: boundedPosition.x,
        color: text.hexColor,
        fontSize: text.fontSize * scale,
        width: text.size.width * scale,
        height: text.size.height * scale,
    }

    return (
        <>
            <div
                ref={textRef}
                className={styles.text}
                style={style}
                onClick={(e) => {
                    if (e.defaultPrevented) return
                    setSelection({
                        type: 'object',
                        id: text.id,
                    })
                    e.preventDefault()
                }}
            >
                {text.value}
                {isSelected
                && scale === 1
                && (
                    <ResizeFrame
                        textRef={textRef}
                        parentRef={parentRef}
                        objId={text.id}
                        onResize={onResize}
                        scale={scale}
                        onStartResize={() => setIsResizing(true)}
                        onStopResize={() => setIsResizing(false)}
                    />
                )}
            </div>
        </>

    )
}

export { Text }
