import React, {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import {joinStyles} from '../../utils/joinStyles'
import {PopoverLayer} from '../PopoverLayer/PopoverLayer'
import styles from './BasePopover.module.css'

type BasePopoverProps = {
	children: React.ReactNode,
	onClose: () => void,
	position?: {
		x: number,
		y: number,
	},
	anchorRef?: React.RefObject<HTMLElement>,
	className?: string,
}

export function BasePopover({
	children,
	onClose,
	position,
	anchorRef,
	className,
}: BasePopoverProps) {
	const [style, setStyle] = useState<React.CSSProperties>()
	const [isOpen, setIsOpen] = useState(false)
	const popoverRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (position) {
			setStyle({
				position: 'fixed',
				top: position.y,
				left: position.x,
				zIndex: 10,
			})
		}
		else if (anchorRef?.current) {
			const rect = anchorRef.current.getBoundingClientRect()
			setStyle({
				position: 'fixed',
				top: rect.bottom + window.scrollY,
				right: window.innerWidth - (rect.right + window.scrollX),
				zIndex: 10,
			})
		}
		setIsOpen(true)
	}, [position, anchorRef])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popoverRef.current
                && !popoverRef.current.contains(event.target as Node)
                && (!anchorRef?.current || !anchorRef.current.contains(event.target as Node))
			) {
				setIsOpen(false)
				setTimeout(onClose, 200)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [onClose, anchorRef])

	return (
		<PopoverLayer>
			<div
				ref={popoverRef}
				className={joinStyles(
					styles.popover,
					isOpen && styles.open,
					className,
				)}
				style={style}
			>
				{children}
			</div>
		</PopoverLayer>
	)
}
