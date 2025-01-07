import {
	type CSSProperties,
	useMemo,
	useRef,
} from 'react'
import {
	type BackgroundType,
	type PictureType,
	type SlideType,
	type TextType,
} from '../../store/types'
import {Picture} from '../Picture/Picture'
import {Text} from '../Text/Text'
import styles from './Slide.module.css'

type SlideProps = {
	slide: SlideType,
	scale?: number,
}

function Slide({
	slide,
	scale = 1,
}: SlideProps) {
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
								parentRef={parentRef}
								text={obj}
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

export {Slide}
