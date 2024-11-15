import { 
    RefObject, 
    useEffect, 
    useRef, 
    useState, 
} from 'react'
import { PositionType } from '../../store/types'

function useDragAndDrop(
    ref: RefObject<HTMLDivElement>,
    dispatchFn: (position: PositionType) => void,
): PositionType | null {
    const [position, setPosition] = useState<PositionType | null>(null)

    // Используем useRef для хранения начальных позиций, чтобы избежать асинхронности useState
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
        if (!startPos.current || !modelStartPos.current) return

        const delta = {
            x: e.pageX - startPos.current.x,
            y: e.pageY - startPos.current.y,
        }
        const newPos = {
            x: modelStartPos.current.x + delta.x,
            y: modelStartPos.current.y + delta.y,
        }

        setPosition(newPos)
        e.preventDefault()
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        console.log('Диспатч должен был уйти');
        if (position) {
            dispatchFn(position)
        } 
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('mousedown', handleMouseDown)
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousedown', handleMouseDown)
            }
        }
    }, [ref.current]) // Убедитесь, что эффект зависит от ref.current

    return position
}

export {useDragAndDrop}
