import {
    useRef, useEffect, useCallback, useState,
} from 'react'
import { dispatch } from '../../store/editor'
import {
    changeObjectPosition, setObjectAsSelected,
} from '../../store/methods'
import {
    TextType, PositionType,
} from '../../store/types'
import { useDragAndDrop } from '../../view/hooks/useDragAndDrop'
import { useBoundedPosition } from '../../view/hooks/useBoundedPosition'  // Импортируем кастомный хук
import styles from './Text.module.css'

type TextProps = {
    text: TextType
    parentRef: React.RefObject<HTMLDivElement>
    isSelected: boolean
    scale: number
}

function Text({
    text,
    isSelected,
    parentRef,
    scale,
}: TextProps) {
    const textRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<PositionType>(text.position)

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

    const boundedPosition = useBoundedPosition(updatedPosition || position, parentRef, textRef)

    useEffect(() => {
        if (updatedPosition) {
            setPosition(updatedPosition)
        }
    }, [updatedPosition])

    const style = {
        top: boundedPosition.y * scale,
        left: boundedPosition.x * scale,
        color: text.hexColor,
        fontSize: text.fontSize * scale,
        width: text.size.width * scale,
        height: text.size.height * scale,
        border: isSelected ? '2px solid black' : '',
    }

    return (
        <div
            ref={textRef}
            className={styles.text}
            style={style}
            onClick={() => dispatch(setObjectAsSelected, { id: text.id })}
        >
            {text.value}
        </div>
    )
}

export { Text }
