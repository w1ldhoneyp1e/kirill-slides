import {type ReactNode} from 'react'
import {createPortal} from 'react-dom'

type PopupLayerProps = {
	children: ReactNode,
}

function PopupLayer({children}: PopupLayerProps) {
	const popupRoot = document.getElementById('popup-root')
	if (!popupRoot) {
		return null
	}

	return createPortal(children, popupRoot)
}

export {PopupLayer}
