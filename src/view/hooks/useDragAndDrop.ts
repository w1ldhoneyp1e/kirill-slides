import {
	type RefObject,
	useEffect,
	useRef,
} from 'react'
import {type PositionType} from '../../store/types'

type UseDragAndDropProps = {
	ref: RefObject<HTMLDivElement>,
	onMouseDown?: () => void,
	onMouseMove?: (delta: PositionType) => void,
	onMouseUp?: (delta: PositionType) => void,
}

function useDragAndDrop({
	ref,
	onMouseDown,
	onMouseMove,
	onMouseUp,
}: UseDragAndDropProps) {
	const startPos = useRef<PositionType | null>(null)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!startPos.current) {
				return
			}

			const _delta = {
				x: e.pageX - startPos.current.x,
				y: e.pageY - startPos.current.y,
			}

			if (onMouseMove) {
				onMouseMove(_delta)
			}
			e.preventDefault()
		}

		const handleMouseUp = (e: MouseEvent) => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)

			if (!startPos.current) {
				return
			}
			const _delta = {
				x: e.pageX - startPos.current.x,
				y: e.pageY - startPos.current.y,
			}

			if (onMouseUp && _delta) {
				onMouseUp(_delta)
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
	}, [onMouseDown, onMouseMove, onMouseUp, ref])
}

export {
	useDragAndDrop,
}
