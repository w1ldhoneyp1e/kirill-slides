import {useMemo} from 'react'
import {type SlideType} from '../../../../store/types'

type UseTargetIndexProps = {
	positionY: number | null,
	slide: SlideType,
	slides: SlideType[],
	height: number,
	gap: number,
}

const useTargetIndex = ({
	positionY,
	slide,
	slides,
	height,
	gap,
}: UseTargetIndexProps): number => {
	const targetIndex = useMemo(() => {
		if (!positionY || !height) {
			return slides.findIndex(s => s.id === slide.id)
		}

		const currentIndex = slides.findIndex(s => s.id === slide.id)
		const indexPositionY = (height + gap) * currentIndex
		let newTargetIndex = currentIndex

		if (positionY - indexPositionY > height + gap) {
			newTargetIndex = currentIndex + 1
		}
		else if (positionY - indexPositionY < -(height + gap)) {
			newTargetIndex = currentIndex - 1
		}

		return Math.max(0, Math.min(newTargetIndex, slides.length - 1))
	}, [positionY, slide.id, slides, height, gap])

	return targetIndex
}

export {useTargetIndex}
