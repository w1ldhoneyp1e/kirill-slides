import { useState, useEffect, useRef, RefObject } from 'react'
import styles from './Shell.module.css'
import { Slide } from '../../../components/Slide/Slide'
import { EditorType, PositionType, SlideType } from '../../../store/types'
import { dispatch } from '../../../store/editor'
import { changeSlidePosition } from '../../../store/methods'

type ShellProps = {
	editor: EditorType
	onClick: () => void
	slide: SlideType
}

function Shell({ editor, onClick, slide }: ShellProps) {
	const slideRef = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState<PositionType | null>({ x: 0, y: 0 })
	const [isDragging, setDragging] = useState<boolean>(false)
	const [startPos, setStartPos] = useState<PositionType | null>(null)
	const [modelStartPos, setModelStartPos] = useState<PositionType | null>(null)
	const [dragIndex, setDragIndex] = useState<number | null>(null)
	const SLIDE_HEIGHT = (300 * 9) / 16

	const collection = [...editor.presentation.slides]

	function useDragAndDrop(ref: RefObject<HTMLDivElement>) {
		const handleMouseDown = (e: MouseEvent): void => {
			const index = collection.findIndex((s) => s.id === slide.id)
			setDragIndex(index)
			setStartPos({ x: e.pageX, y: e.pageY })
			ref.current
				? setModelStartPos({
						x: ref.current.getBoundingClientRect().left,
						y: ref.current.getBoundingClientRect().top,
				  })
				: setModelStartPos({ x: 0, y: 0 })
			setDragging(true)
			e.preventDefault() // предотвращает выделение текста
		}

		const handleMouseMove = (e: MouseEvent) => {
			const delta = startPos
				? { x: e.pageX - startPos.x, y: e.pageY - startPos.y }
				: { x: 0, y: 0 }
			const newPos = modelStartPos
				? {
						x: modelStartPos.x + delta.x,
						y: modelStartPos.y + delta.y,
				  }
				: { x: 0, y: 0 }
			setPosition(newPos)
			const deltaYAbs = Math.abs(delta.y)
			if (deltaYAbs > SLIDE_HEIGHT && dragIndex !== null) {
				const targetIndex = delta.y > 0 ? dragIndex + 1 : dragIndex - 1
				if (targetIndex >= 0 && targetIndex < collection.length) {
					dispatch(changeSlidePosition, {
						slideId: slide.id,
						positionToMove: targetIndex,
					})
					setDragIndex(targetIndex)
					// Сбрасываем стартовую позицию и начальное положение модели
					setStartPos({ x: e.pageX, y: e.pageY })
					setModelStartPos(newPos)
				}
			}
			e.preventDefault() // предотвращает выделение текста
		}

		const handleMouseUp = () => {
			if (ref.current) {
				ref.current.removeEventListener('mousedown', handleMouseDown)
			}
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
			setDragIndex(null)
			setStartPos(null)
			setDragging(false)
		}

		useEffect(() => {
			if (ref.current) {
				ref.current.addEventListener('mousedown', handleMouseDown)
			}

			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)

			return () => {
				if (ref.current) {
					ref.current.removeEventListener('mousedown', handleMouseDown)
				}
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}
		}, [slide.id, collection])
	}

	useDragAndDrop(slideRef)

	return (
		<div
			className={styles.shell}
			ref={slideRef}
			onClick={onClick}
			style={{
				cursor: 'pointer',
				position: isDragging ? 'absolute' : 'static',
				top: isDragging && position ? `${position.y}px` : 'auto',
				left: isDragging && position ? `${position.x}px` : 'auto',
				// transition: isDragging ? 'none' : 'top 0.2s, left 0.2s', // Плавный переход при завершении перетаскивания
			}}
		>
			<Slide
				editor={editor}
				slide={slide}
				isSelected={slide.id === editor.selection.selectedSlideId}
			/>
		</div>
	)
}

export { Shell }
