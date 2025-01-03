import {
	type RefObject,
	useEffect,
	useRef,
	useState,
} from 'react'
import {type PositionType} from '../../store/types'

type UseDragAndDropProps = {
	ref: RefObject<HTMLDivElement>,
	parentRef: RefObject<HTMLDivElement>,
	onMouseDown?: () => void,
	onMouseUp?: (delta: PositionType) => void,
}

function useDragAndDrop({
	ref,
	parentRef,
	onMouseDown,
	onMouseUp,
}: UseDragAndDropProps): PositionType | null {
	const [delta, setDelta] = useState<PositionType | null>(null)
	const deltaRef = useRef<PositionType | null>(null)
	const startPos = useRef<PositionType | null>(null)
	const modelStartPos = useRef<PositionType | null>(null)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!startPos.current || !modelStartPos.current || !parentRef.current) {
				return
			}

			const parentRect = parentRef.current.getBoundingClientRect()

			const _delta = {
				x: e.pageX - startPos.current.x,
				y: e.pageY - startPos.current.y,
			}

			const newDelta = {
				x: modelStartPos.current.x + _delta.x - parentRect.left,
				y: modelStartPos.current.y + _delta.y - parentRect.top,
			}

			deltaRef.current = newDelta
			setDelta(newDelta)
			e.preventDefault()
		}

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)

			if (onMouseUp && deltaRef.current !== null) {
				onMouseUp(deltaRef.current)
			}
		}
		const handleMouseDown = (e: MouseEvent): void => {
			if (onMouseDown) {
				onMouseDown()
			}
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

		const element = ref.current
		if (element) {
			element.addEventListener('mousedown', handleMouseDown)
		}
		return () => {
			if (element) {
				element.removeEventListener('mousedown', handleMouseDown)
			}
		}
	}, [onMouseDown, onMouseUp, parentRef, ref])

	return delta
}

export {useDragAndDrop}
