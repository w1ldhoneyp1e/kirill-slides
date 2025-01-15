import {useCallback, useState} from 'react'

type Position = {
	x: number,
	y: number,
} | null

function useContextMenu() {
	const [position, setPosition] = useState<Position>(null)
	const [isOpen, setIsOpen] = useState(false)

	const handleContextMenu = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		setPosition({
			x: e.clientX,
			y: e.clientY,
		})
		setIsOpen(true)
	}, [])

	const handleClose = useCallback(() => {
		setIsOpen(false)
		setPosition(null)
	}, [])

	return {
		position,
		isOpen,
		handleContextMenu,
		handleClose,
	}
}

export {useContextMenu}
