import {
	type CSSProperties,
	useMemo,
	useRef,
} from 'react'
import {
	type BackgroundType,
	type PictureType,
	type TextType,
} from '../../store/types'
import {useAppSelector} from '../../view/hooks/useAppSelector'
import {Picture} from '../Picture/Picture'
import {Text} from '../Text/Text'
import styles from './Slide.module.css'

type SlideProps = {
	slideId: string,
	scale?: number,
}

function Slide({
	slideId,
	scale = 1,
}: SlideProps) {
	const slides = useAppSelector(editor => editor.presentation.slides)
	const slide = slides.find(s => s.id === slideId)!

	const parentRef = useRef<HTMLDivElement>(null)

	const contentObjects = slide.contentObjects

	function setBackground(background: BackgroundType): string {
		let value = ''
		if (background.type === 'solid') {
			value = background.hexColor
		}
		if (background.type === 'image') {
			value = `url(${background.src})`
		}
		return value
	}

	const style: CSSProperties = useMemo(
		() => slide
			? {background: setBackground(slide.background)}
			: {},
		[slide],
	)

	return (
		<div
			className={styles.slide}
			style={style}
			ref={parentRef}
		>
			{contentObjects
				? contentObjects.map((obj: TextType | PictureType) => {
					if (obj.type === 'text') {
						return (
							<Text
								key={obj.id}
								scale={scale}
								slideId={slide.id}
								parentRef={parentRef}
								textId={obj.id}
							/>
						)
					}
					else if (obj.type === 'picture') {
						return (
							<Picture
								key={obj.id}
								scale={scale}
								pictureObj={obj}
							/>
						)
					}
					return null

				})
				: null}
		</div>
	)
}

export {
	Slide,
}
