import {type ReactNode} from 'react'
import {createPortal} from 'react-dom'

type PopoverLayerProps = {
	children: ReactNode,
}

function PopoverLayer({children}: PopoverLayerProps) {
	const popoverRoot = document.getElementById('popover-root')
	if (!popoverRoot) {
		return null
	}

	return createPortal(children, popoverRoot)
}

export {PopoverLayer}
