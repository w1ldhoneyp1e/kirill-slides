import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import {Slide} from '../../../components/Slide/Slide'
import {type PositionType, type SlideType} from '../../../store/types'
import {useAppActions} from '../../hooks/useAppActions'
import {useAppSelector} from '../../hooks/useAppSelector'
import {useDragAndDrop} from '../../hooks/useDragAndDrop'
import styles from './Shell.module.css'

const SLIDE_SCALE = 0.2

type ShellProps = {
	onClick: () => void,
	slide: SlideType,
	parentRef: React.RefObject<HTMLDivElement>,
}

function Shell({
	slide,
	onClick,
	parentRef,
}: ShellProps) {
	const [onDrag, setOnDrag] = useState(false)
	const slides = useAppSelector((editor => editor.presentation.slides))
	const [targetIndex, setTargetIndex] = useState(slides.findIndex(s => s.id === slide.id))
	const slideRef = useRef<HTMLDivElement>(null)
	const gap = 30
	const heightRef = useRef(0)

	const {setSlideIndex} = useAppActions()

	const onMouseUp = useCallback(() => {
		setOnDrag(false)
	}, [])

	const onMouseDown = useCallback(() => {
		setOnDrag(true)
	}, [])

	const delta = useDragAndDrop({
		ref: slideRef,
		parentRef,
		onMouseDown,
		onMouseUp,
	})

	useEffect(() => {
		if (slideRef.current) {
			heightRef.current = slideRef.current.getBoundingClientRect().height
		}
	}, [slideRef])

	useEffect(() => {
		const calculateTargetIndex = (_delta: PositionType | null): number => {
			if (!_delta || !heightRef.current) {
				return slides.findIndex(s => s.id === slide.id)
			}

			const currentIndex = slides.findIndex(s => s.id === slide.id)
			const indexPositionY = (heightRef.current + gap) * currentIndex
			let newTargetIndex = currentIndex

			if (_delta.y - indexPositionY > heightRef.current + gap) {
				newTargetIndex = currentIndex + 1
			}
			else if (_delta.y - indexPositionY < -(heightRef.current + gap)) {
				newTargetIndex = currentIndex - 1
			}

			return newTargetIndex
		}
		const newTargetIndex = calculateTargetIndex(delta)
		if (newTargetIndex !== targetIndex) {
			setTargetIndex(newTargetIndex)
		}
	}, [delta, slide.id, slides, targetIndex])


	useEffect(() => {
		if (
			targetIndex !== slides.findIndex(s => s.id === slide.id)
            && targetIndex >= 0
            && targetIndex < slides.length
		) {
			setSlideIndex({
				id: slide.id,
				index: targetIndex,
			})
		}
	}, [targetIndex, slide.id, setSlideIndex, slides])

	useEffect(() => {
		if (!slideRef.current || !parentRef.current || !delta) {
			return
		}
		const slideRect = slideRef.current.getBoundingClientRect()
		const parentRect = parentRef.current.getBoundingClientRect()

		if (slideRect.width + delta.x > parentRect.width) {
			slideRef.current.style.left = `${parentRect.width - slideRect.width}px`
		}

		if (delta.x < parentRect.x) {
			slideRef.current.style.left = `${parentRect.x}px`
		}
	}, [delta, parentRef])

	const selectedSlideId = useAppSelector(editor => editor.selection.selectedSlideId)
	const isSelected = useMemo(
		() => slide.id === selectedSlideId,
		[selectedSlideId, slide.id],
	)

	const style = onDrag && !!delta
		? {
			cursor: 'pointer',
			position: 'absolute' as const,
			top: delta
				? delta.y
				: 0,
			left: delta
				? delta.x
				: 0,
			height: heightRef.current,
			border: isSelected
				? '3px solid var(--color-gray-dark)'
				: '1px solid var(--color-gray-dark)',
		}
		: {
			border: isSelected
				? '3px solid var(--color-gray-dark)'
				: '1px solid var(--color-gray-dark)',
		}

	return (
		<>
			{onDrag
            && (targetIndex === slides.findIndex(s => s.id === slide.id))
			&& (
				<div
					className={styles.placeholder}
					style={{
						height: heightRef.current,
						width: '100%',
						background: 'transparent',
					}}
				/>
			)}
			<div
				className={styles.shell}
				ref={slideRef}
				onClick={onClick}
				style={style}
			>
				<Slide
					slide={slide}
					scale={SLIDE_SCALE}
				/>
			</div>
		</>
	)
}

export {Shell}
