import { useState, useEffect, useRef, RefObject } from 'react'
import styles from './Shell.module.css'
import { Slide } from '../../../components/Slide/Slide'
import { dispatch } from '../../../store/editor'
import { changeSlidePosition } from '../../../store/methods'
import { EditorType, PositionType, SlideType } from '../../../store/types'

type ShellProps = {
	editor: EditorType
	onClick: () => void
	slide: SlideType
}

function Shell({ editor, onClick, slide }: ShellProps) {
	const slideRef = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState<PositionType | null>({ x: 0, y: 0 })
	const [initialPosition, setInitialPosition] = useState<PositionType | null>(
		null,
	)
	const [isDragging, setDragging] = useState<boolean>(false)
	const [dragId, setDragId] = useState<string | null>(null)
	const [startPos, setStartPos] = useState<PositionType | null>(null)
	const [dragIndex, setDragIndex] = useState<number | null>(null)
	const SLIDE_HEIGHT = (300 * 9) / 16

	const collection = [...editor.presentation.slides]

	function useDragAndDrop(ref: RefObject<HTMLDivElement>) {
		const handleMouseDown = (
			e: MouseEvent,
			slideId: string,
			index: number,
		): void => {
			setStartPos({ x: e.clientX, y: e.clientY })
			setDragId(slideId)
			setDragIndex(index)
			if (position) {
				setInitialPosition({ x: position.x, y: position.y }) // Сохраняем текущее положение
			}
			setDragging(true)
			e.preventDefault() // предотвращает выделение текста
		}

		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging && initialPosition && startPos) {
				const deltaX = e.clientX - startPos.x
				const deltaY = e.clientY - startPos.y

				// Обновляем позицию слайда
				setPosition({
					x: initialPosition.x + deltaX,
					y: initialPosition.y + deltaY,
				})

				// Проверка на перемещение слайда
				const deltaYAbs = Math.abs(deltaY)
				if (deltaYAbs > SLIDE_HEIGHT && dragIndex) {
					const targetIndex = deltaY > 0 ? dragIndex + 1 : dragIndex - 1
					if (targetIndex >= 0 && targetIndex < collection.length) {
						dispatch(changeSlidePosition, {
							slideId: dragId,
							positionToMove: targetIndex,
						})
						setDragIndex(targetIndex)
						setStartPos({ x: e.clientX, y: e.clientY }) // обновляем начальную позицию
						if (position) {
							setInitialPosition({
								x: position.x + deltaX,
								y: position.y + deltaY,
							}) // обновляем начальное положение
						}
					}
				}
			}
		}

		const handleMouseUp = () => {
			setDragIndex(null)
			setDragId(null)
			setStartPos(null)
			setInitialPosition(null)
			setDragging(false)
		}

		useEffect(() => {
			const index = collection.findIndex((s) => s.id === slide.id)
			if (ref.current) {
				ref.current.addEventListener('mousedown', (e) =>
					handleMouseDown(e, slide.id, index),
				)
			}

			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('mouseup', handleMouseUp)

			return () => {
				if (ref.current) {
					ref.current.removeEventListener('mousedown', (e) =>
						handleMouseDown(e, slide.id, index),
					)
				}
				window.removeEventListener('mousemove', handleMouseMove)
				window.removeEventListener('mouseup', handleMouseUp)
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
				transition: isDragging ? 'none' : 'top 0.2s, left 0.2s', // Плавный переход при завершении перетаскивания
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
