import {useMemo} from 'react'
import {type PositionType, type SlideType} from '../../../../store/types'

type UseTargetIndexProps = {
	delta: PositionType,
	slide: SlideType,
	slides: SlideType[],
	heightRef: React.RefObject<number>,
	gap: number,
}

const useTargetIndex = ({
	delta,
	slide,
	slides,
	heightRef,
	gap,
}: UseTargetIndexProps): number => {
	const targetIndex = useMemo(() => {
		if (!delta || !heightRef.current) {
			return slides.findIndex(s => s.id === slide.id)
		}

		const currentIndex = slides.findIndex(s => s.id === slide.id)
		const indexPositionY = (heightRef.current + gap) * currentIndex
		let newTargetIndex = currentIndex

		if (delta.y - indexPositionY > heightRef.current + gap) {
			newTargetIndex = currentIndex + 1
		}
		else if (delta.y - indexPositionY < -(heightRef.current + gap)) {
			newTargetIndex = currentIndex - 1
		}

		return Math.max(0, Math.min(newTargetIndex, slides.length - 1))
	}, [delta, slide.id, slides, heightRef, gap])

	return targetIndex
}

export {useTargetIndex}
