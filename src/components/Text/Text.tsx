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

    const updatedPosition = useDragAndDrop(textRef, dispatchFn)

    // Сохраняем позицию в состоянии
    useEffect(() => {
        if (updatedPosition) {
            setPosition(updatedPosition)
        }
    }, [updatedPosition])  // зависимость на обновление позиции

    useEffect(() => {
        if (!parentRef.current || !position || !text.position || !textRef.current) {
            return
        }
        const parentRect = parentRef.current.getBoundingClientRect()
        const textRect = textRef.current.getBoundingClientRect()

        // Клонируем позицию для работы
        const newPosition = { ...position }

        // Ограничение по границам
        if (newPosition.x < parentRect.left) {
            newPosition.x = parentRect.left
        }
        if (newPosition.x + textRect.width > parentRect.left + parentRect.width) {
            newPosition.x = parentRect.left + parentRect.width - textRect.width
        }
        if (newPosition.y < parentRect.top) {
            newPosition.y = parentRect.top
        }
        if (newPosition.y + textRect.height > parentRect.top + parentRect.height) {
            newPosition.y = parentRect.top + parentRect.height - textRect.height
        }

        // Обновляем состояние только при изменении позиции
        if (
            newPosition.x !== position.x ||
            newPosition.y !== position.y
        ) {
            setPosition(newPosition)
        }
    }, [parentRef, position, text.position])

    const style = {
        top: position && parentRef.current
            ? (position.y - parentRef.current.getBoundingClientRect().top) * scale
            : 100,
        left: position && parentRef.current
            ? (position.x - parentRef.current.getBoundingClientRect().left) * scale
            : 100,
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
