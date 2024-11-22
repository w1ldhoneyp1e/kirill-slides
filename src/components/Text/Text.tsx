import {
    useRef, useCallback,
} from 'react'
import { dispatch } from '../../store/editor'
import {
    changeObjectPosition, setObjectAsSelected,
} from '../../store/methods'
import {
    TextType, PositionType,
    SizeType,
} from '../../store/types'
import { useDragAndDrop } from '../../view/hooks/useDragAndDrop'
import { useBoundedPosition } from '../../view/hooks/useBoundedPosition'  // Импортируем кастомный хук
import styles from './Text.module.css'
import { ResizeFrame } from '../ResizeFrame/ResizeFrame'

type TextProps = {
    text: TextType
    parentRef: React.RefObject<HTMLDivElement>
    isSelected: boolean
    scale: number
    onResize: (objId: string, size: SizeType) => void
}

function Text({
    text,
    isSelected,
    parentRef,
    scale,
    onResize,
}: TextProps) {
    const textRef = useRef<HTMLDivElement>(null)

    const dispatchFn = useCallback(
        (position: PositionType) => {
            dispatch(changeObjectPosition, {
                id: text.id,
                position,
            })
        },
        [text.id],
    )

    const updatedPosition = useDragAndDrop({
        ref: textRef,
        parentRef,
        onMouseUp: dispatchFn,
    })

    const boundedPosition = useBoundedPosition({
        x: updatedPosition ? updatedPosition.x * scale : text.position.x * scale,
        y: updatedPosition ? updatedPosition.y * scale : text.position.y * scale,
    }, parentRef, textRef)

    const style = {
        top: boundedPosition.y,
        left: boundedPosition.x,
        color: text.hexColor,
        fontSize: text.fontSize * scale,
        width: text.size.width * scale,
        height: text.size.height * scale,
        border: isSelected ? '2px solid black' : '',
    }

    return (
        <>
            <div
                ref={textRef}
                className={styles.text}
                style={style}
                onClick={() => dispatch(setObjectAsSelected, { id: text.id })}
            >
                {text.value}
                {isSelected && (
                    <ResizeFrame
                        textRef={textRef}
                        parentRef={parentRef}
                        objId={text.id}
                        onResize={onResize}
                        scale={scale}
                    />
                )}
            </div>
        </>

    )
}

export { Text }
