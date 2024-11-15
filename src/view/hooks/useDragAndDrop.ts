import { RefObject, useEffect, useRef, useState } from 'react'
import { PositionType } from '../../store/types'

function useDragAndDrop(
    ref: RefObject<HTMLDivElement>,
    parentRef: RefObject<HTMLDivElement>,
    dispatchFn: (delta: PositionType) => void,
): PositionType | null {
    const [delta, setDelta] = useState<PositionType | null>(null)
    const deltaRef = useRef<PositionType | null>(null)
    const startPos = useRef<PositionType | null>(null)
    const modelStartPos = useRef<PositionType | null>(null)

    const handleMouseDown = (e: MouseEvent): void => {
        startPos.current = {
            x: e.pageX,
            y: e.pageY,
        }
        modelStartPos.current = ref.current
            ? {
                  x: ref.current.getBoundingClientRect().left,
                  y: ref.current.getBoundingClientRect().top,
              }
            : {
                  x: 0,
                  y: 0,
              }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!startPos.current || !modelStartPos.current || !parentRef.current) return

        const parentRect = parentRef.current.getBoundingClientRect()

        const delta = {
            x: e.pageX - startPos.current.x,
            y: e.pageY - startPos.current.y,
        }

        const newDelta = {
            x: modelStartPos.current.x + delta.x - parentRect.left,
            y: modelStartPos.current.y + delta.y - parentRect.top,
        }

        deltaRef.current = newDelta
        setDelta(newDelta)
        e.preventDefault()
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)

        if (deltaRef.current) {
            dispatchFn(deltaRef.current)
        }
    }

    useEffect(() => {
        const element = ref.current
        if (element) {
            element.addEventListener('mousedown', handleMouseDown)
        }
        return () => {
            if (element) {
                element.removeEventListener('mousedown', handleMouseDown)
            }
        }
    }, [ref])

    return delta
}

export { useDragAndDrop }
