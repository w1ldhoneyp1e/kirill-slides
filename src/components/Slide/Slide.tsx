import {useMemo, useRef} from 'react'
import {type BackgroundType} from '../../store/types'
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
	const slide = useAppSelector(editor =>
		editor.presentation.slides.find(s => s.id === slideId)!,
	)

	const parentRef = useRef<HTMLDivElement>(null)

	const setBackground = (background: BackgroundType): string => {
		if (background.type === 'solid') {
			return background.hexColor
		}
		if (background.type === 'image') {
			return `url(${background.src})`
		}
		return ''
	}

	const style = useMemo(
		() => ({background: setBackground(slide.background)}),
		[slide.background],
	)

	return (
		<div
			className={styles.slide}
			style={style}
			ref={parentRef}
		>
			{slide.contentObjects.map(obj => {
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
				if (obj.type === 'picture') {
					return (
						<Picture
							key={obj.id}
							scale={scale}
							parentRef={parentRef}
							slideId={slide.id}
							pictureId={obj.id}
						/>
					)
				}
				return null
			})}
		</div>
	)
}

export {Slide}
