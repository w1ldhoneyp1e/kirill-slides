import {useMemo} from 'react'
import {Trash24px} from '../assets/icons/Trash24px'
import {useAppActions} from '../view/hooks/useAppActions'
import {useContextMenu} from './useContextMenu'

export function useObjectContextMenu() {
	const {deleteObjects} = useAppActions()
	const {
		handleContextMenu,
		position,
		isOpen,
		handleClose,
	} = useContextMenu()

	const contextMenuItems = useMemo(() => [
		{
			type: 'icon-text' as const,
			icon: Trash24px,
			text: 'Удалить',
			onClick: () => {
				console.log('Deleting object...')
				deleteObjects()
				handleClose()
			},
		},
	], [deleteObjects, handleClose])

	return {
		handleContextMenu,
		position,
		isOpen,
		handleClose,
		contextMenuItems,
	}
}
