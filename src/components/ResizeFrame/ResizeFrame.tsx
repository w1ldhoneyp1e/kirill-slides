import React, { useRef } from 'react'
import { useDragAndDrop } from '../../view/hooks/useDragAndDrop'
import styles from './ResizeFrame.module.css'

type ResizeFrameProps = {
    parentRef: React.RefObject<HTMLDivElement>;
    textRef: React.RefObject<HTMLDivElement>;
    objId: string;
    scale: number;
    onStartResize: () => void;
    onStopResize: () => void;
};

export const ResizeFrame: React.FC<ResizeFrameProps> = ({
    parentRef,
    textRef,
    objId,
    scale,
    onStartResize,
    onStopResize,
}) => {
    const resizeRefs = {
        topLeft: useRef<HTMLDivElement>(null),
        topRight: useRef<HTMLDivElement>(null),
        bottomLeft: useRef<HTMLDivElement>(null),
        bottomRight: useRef<HTMLDivElement>(null),
    }

    const onResize = () => {}

    // Используем хуки useDragAndDrop только для вызова onMouseUp
    useDragAndDrop({
        ref: resizeRefs.topLeft,
        parentRef,
        onMouseUp: (delta) => handleResize('topLeft', delta),
    })

    useDragAndDrop({
        ref: resizeRefs.topRight,
        parentRef,
        onMouseUp: (delta) => handleResize('topRight', delta),
    })

    useDragAndDrop({
        ref: resizeRefs.bottomLeft,
        parentRef,
        onMouseUp: (delta) => handleResize('bottomLeft', delta),
    })

    useDragAndDrop({
        ref: resizeRefs.bottomRight,
        parentRef,
        onMouseUp: (delta) => handleResize('bottomRight', delta),
    })

    const updateFramePosition = (): { top: number; left: number; width: number; height: number } => {
        if (!textRef.current || !parentRef.current) return {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        }

        const textRect = textRef.current.getBoundingClientRect()

        return {
            top: 0,
            left: 0,
            width: (textRect.width),
            height: (textRect.height),
        }
    }

    const handleResize = (resizeType: string, delta: { x: number; y: number }) => {
        if (!textRef.current || !parentRef.current) return

        const textRect = textRef.current.getBoundingClientRect()
        const parentRect = parentRef.current.getBoundingClientRect()
        const offset = {
            x: textRect.x - parentRect.x,
            y: textRect.y - parentRect.y,
        }
        let newWidth = textRect.width
        let newHeight = textRect.height

        switch (resizeType) {
        case 'topLeft':
            newWidth -= delta.x - offset.x
            newHeight -= delta.y - offset.y
            break
        case 'topRight':
            newWidth +=  delta.x - (offset.x + textRect.width)
            newHeight -= delta.y - offset.y
            break
        case 'bottomLeft':
            newWidth -= delta.x - offset.x
            newHeight += delta.y - (offset.y + textRect.height)
            break
        case 'bottomRight':
            newWidth +=  delta.x - (offset.x + textRect.width)
            newHeight += delta.y - (offset.y + textRect.height)
            break
        }

        onResize(objId, {
            width: Math.max(newWidth, 50),
            height: Math.max(newHeight, 20),
        })
    }

    const framePosition = updateFramePosition()

    const style = {
        width: 10 * scale,
        height: 10 * scale,
    }

    return (
        <div
            className={styles.resizeFrame}
            style={{
                top: framePosition.top,
                left: framePosition.left,
                width: framePosition.width,
                height: framePosition.height,
                position: 'absolute',
            }}
        >
            {/* Углы */}
            <div
                ref={resizeRefs.topLeft}
                className={`${styles.corner} ${styles.topLeft}`}
                onMouseDown={onStartResize}
                onMouseUp={onStopResize}
                style={style}
            />
            <div
                ref={resizeRefs.topRight}
                className={`${styles.corner} ${styles.topRight}`}
                onMouseDown={onStartResize}
                onMouseUp={onStopResize}
                style={style}
            />
            <div
                ref={resizeRefs.bottomLeft}
                className={`${styles.corner} ${styles.bottomLeft}`}
                onMouseDown={onStartResize}
                onMouseUp={onStopResize}
                style={style}
            />
            <div
                ref={resizeRefs.bottomRight}
                className={`${styles.corner} ${styles.bottomRight}`}
                onMouseDown={onStartResize}
                onMouseUp={onStopResize}
                style={style}
            />
        </div>
    )
}
