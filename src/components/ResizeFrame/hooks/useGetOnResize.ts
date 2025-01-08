import {useCallback} from 'react'
import {type PositionType, type SizeType} from '../../../store/types'

type UseGetOnResizeProps = {
	position: PositionType,
	size: SizeType,
	setPosition: (p: PositionType) => void,
	setSize: (s: SizeType) => void,
}

function useGetOnResize({
	position,
	size,
	setPosition,
	setSize,
}: UseGetOnResizeProps) {
	return useCallback(
		(handle: string, delta: PositionType) => {
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

			setSize({
				width: newWidth,
				height: newHeight,
			})
			setPosition({
				x: newX,
				y: newY,
			})
		},
		[position, size, setPosition, setSize],
	)
}

export {
	useGetOnResize,
}
