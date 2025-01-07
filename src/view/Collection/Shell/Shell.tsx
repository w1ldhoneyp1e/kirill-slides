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
import {useTargetIndex} from './hooks/useGetTargetIndex'
import styles from './Shell.module.css'

const SLIDE_SCALE = 0.2
const GAP = 30

type ShellProps = {
	onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
	slide: SlideType,
	parentRef: React.RefObject<HTMLDivElement>,
}

function Shell({
	slide,
	onClick,
	parentRef,
}: ShellProps) {
	const slides = useAppSelector(editor => editor.presentation.slides)
	const selectedSlideId = useAppSelector(editor => editor.selection.selectedSlideId)
	const {setSlideIndex} = useAppActions()

	const [onDrag, setOnDrag] = useState(false)
	const [delta, setDelta] = useState<PositionType | null>(null)
	const [height, setHeight] = useState(0)
	const slideRef = useRef<HTMLDivElement>(null)
	const initialPositionRef = useRef<PositionType>({
		x: 0,
		y: 0,
	})

	const onMouseDown = useCallback(() => {
		if (slideRef.current && parentRef.current) {
			const slideRect = slideRef.current.getBoundingClientRect()
			const parentRect = parentRef.current.getBoundingClientRect()

			initialPositionRef.current = {
				x: slideRect.left - parentRect.left,
				y: slideRect.top - parentRect.top,
			}
		}
		setOnDrag(true)
	}, [parentRef])

	const onMouseMove = useCallback((_delta: PositionType) => {
		setDelta(_delta)
	}, [])

	const onMouseUp = useCallback(() => {
		setOnDrag(false)
		setDelta(null)
	}, [])

	useDragAndDrop({
		ref: slideRef,
		onMouseDown,
		onMouseMove,
		onMouseUp,
	})

	useEffect(() => {
		if (slideRef.current) {
			setHeight(slideRef.current.getBoundingClientRect().height)
		}
	}, [slideRef])

	const targetIndex = useTargetIndex({
		positionY: delta
			? delta.y + initialPositionRef.current.y
			: null,
		slide,
		slides,
		height,
		gap: GAP,
	})

	useEffect(() => {
		const currentIndex = slides.findIndex(s => s.id === slide.id)
		if (targetIndex !== currentIndex && targetIndex >= 0 && targetIndex < slides.length) {
			setSlideIndex({
				id: slide.id,
				index: targetIndex,
			})
		}
	}, [targetIndex, slide.id, setSlideIndex, slides])

	const positionStyle = useMemo(() => {
		if (!onDrag || !delta) {
			return {}
		}

		const {
			x: initialX,
			y: initialY,
		} = initialPositionRef.current
		const {
			x: deltaX,
			y: deltaY,
		} = delta

		return {
			top: initialY + deltaY,
			left: initialX + deltaX,
			cursor: 'pointer',
			position: 'absolute' as const,
			height: height || 'auto',
		}
	}, [onDrag, delta, height])

	const isSelected = useMemo(() => slide.id === selectedSlideId, [selectedSlideId, slide.id])

	const style = {
		...positionStyle,
		border: isSelected
			? '3px solid var(--color-gray-dark)'
			: '1px solid var(--color-gray-dark)',
	}

	return (
		<>
			{onDrag && (
				<div
					className={styles.placeholder}
					style={{
						minHeight: height,
						width: '100%',
					}}
				/>
			)}
			<div
				className={styles.shell}
				ref={slideRef}
				onClick={e => onClick(e)}
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
