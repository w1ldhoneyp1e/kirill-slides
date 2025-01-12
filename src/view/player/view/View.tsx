import {useEffect, useState} from 'react'
import {Slide} from '../../../components/Slide/Slide'
import {useAppSelector} from '../../hooks/useAppSelector'
import styles from './View.module.css'

const SLIDE_WIDTH = 841.89
const SLIDE_HEIGHT = 595.28

type ViewProps = {
	currentSlideIndex: number | null,
	setCurrentSlideIndex: (index: number) => void,
}

function View({
	currentSlideIndex,
	setCurrentSlideIndex,
}: ViewProps) {
	const slides = useAppSelector(editor => editor.presentation.slides)

	const [scale, setScale] = useState(1)

	useEffect(() => {
		if (slides.length) {
			setCurrentSlideIndex(0)
		}
	}, [setCurrentSlideIndex, slides])

	const currentSlide = (currentSlideIndex !== null)
		? slides[currentSlideIndex]
		: null

	useEffect(() => {
		const windowWidth = window.innerWidth
		const windowHeight = window.innerHeight

		const widthScale = windowWidth / SLIDE_WIDTH
		const heightScale = windowHeight / SLIDE_HEIGHT

		setScale(Math.min(widthScale, heightScale) * 0.9)
	}, [])

	return (
		<div className={styles.view}>
			{currentSlide
				? <Slide
					slideId={currentSlide.id}
					scale={scale}
				/>
				: ''}
		</div>
	)
}

export {
	View,
}
