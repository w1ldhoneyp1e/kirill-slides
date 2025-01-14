import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import {Slide} from '../../../components/Slide/Slide'
import {getUID} from '../../../store/methods'
import {type PositionType} from '../../../store/types'
import {joinStyles} from '../../../utils/joinStyles'
import {useAppActions} from '../../hooks/useAppActions'
import {useAppSelector} from '../../hooks/useAppSelector'
import {useDragAndDrop} from '../../hooks/useDragAndDrop'
import {useTargetIndex} from './hooks/useGetTargetIndex'
import styles from './Shell.module.css'

const SLIDE_SCALE = 0.2
const GAP = 30

type ShellProps = {
	slideId: string,
	parentRef: React.RefObject<HTMLDivElement>,
}

function Shell({
	slideId,
	parentRef,
}: ShellProps) {
	const slides = useAppSelector(editor => editor.presentation.slides)
	const slide = useAppSelector(editor => editor.presentation.slides.find(s => s.id === slideId)!)
	const selectedSlideId = useAppSelector(editor => editor.selection.selectedSlideId)
	const {
		deselect,
		setSlideIndex,
		setSelection,
	} = useAppActions()

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
	}, [parentRef])

	const onMouseMove = useCallback((_delta: PositionType) => {
		setOnDrag(true)
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

	const wrapperStyles = useMemo(() => ({
		height: height || 'auto',
	}), [height])

	const shellStyle = useMemo(() => {
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
			position: 'absolute' as const,
		}
	}, [onDrag, delta])

	const isSelected = useMemo(() => slide.id === selectedSlideId, [selectedSlideId, slide.id])

	return (
		<>
			<div
				className={joinStyles(
					styles.placeholder,
					onDrag
						? ''
						: styles.invisible,
				)}
			/>
			<div
				className={joinStyles(
					styles.shell,
					isSelected
						? styles.selected
						: '',
				)}
				ref={slideRef}
				onClick={e => e.preventDefault()}
				onMouseDown={e => {
					deselect({type: 'object'})
					setSelection({
						type: 'slide',
						id: slideId,
					})
					e.preventDefault()
				}}
				style={shellStyle}
			>
				<div
					key={getUID()}
					className={styles.shellSlideWrapper}
					style={wrapperStyles}
				>
					<Slide
						slideId={slide.id}
						scale={SLIDE_SCALE}
					/>
				</div>

			</div>
		</>
	)
}


export {Shell}
