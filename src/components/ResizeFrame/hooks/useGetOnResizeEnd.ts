import {useCallback} from 'react'
import {type PositionType, type SizeType} from '../../../store/types'
import {isValidOffset} from '../../../utils/isValidOffset'
import {useAppActions} from '../../../view/hooks/useAppActions'

type UseGetOnResizeProps = {
	position: PositionType,
	size: SizeType,
	slideId: string,
	objectId: string,
}

function useGetOnResizeEnd({
	position,
	size,
	slideId,
	objectId,
}: UseGetOnResizeProps) {
	const {
		changeObjectPosition,
		changeObjectSize,
	} = useAppActions()

	return useCallback(
		(handle: string, delta: PositionType) => {
			if (!isValidOffset(delta)) {
				return
			}
			let newX = position.x
			let newY = position.y
			let newWidth = size.width
			let newHeight = size.height

			switch (handle) {
				case 'top-left':
					newX += delta.x
					newY += delta.y
					newWidth -= delta.x
					newHeight -= delta.y
					break
				case 'top':
					newY += delta.y
					newHeight -= delta.y
					break
				case 'top-right':
					newY += delta.y
					newWidth += delta.x
					newHeight -= delta.y
					break
				case 'right':
					newWidth += delta.x
					break
				case 'bottom-right':
					newWidth += delta.x
					newHeight += delta.y
					break
				case 'bottom':
					newHeight += delta.y
					break
				case 'bottom-left':
					newX += delta.x
					newWidth -= delta.x
					newHeight += delta.y
					break
				case 'left':
					newX += delta.x
					newWidth -= delta.x
					break
				default:
					break
			}

			changeObjectSize({
				objId: objectId,
				slideId,
				size: {
					width: newWidth,
					height: newHeight,
				},
			})

			changeObjectPosition({
				id: objectId,
				position: {
					x: newX,
					y: newY,
				},
			})
		},
		[position, size, changeObjectSize, objectId, slideId, changeObjectPosition],
	)
}

export {
	useGetOnResizeEnd,
}
