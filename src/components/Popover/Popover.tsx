import React, {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import {getUID} from '../../store/methods'
import {joinStyles} from '../../utils/joinStyles'
import styles from './Popover.module.css'

type PopoverItem =
{
	type: 'text',
	text: string, // Обязательно для 'text'
	icon?: never, // Исключено для 'text'
	onClick: () => void,
}
| {
	type: 'icon',
	icon: JSX.Element, // Обязательно для 'icon'
	text?: never, // Исключено для 'icon'
	onClick: () => void,
}
| {
	type: 'icon-text',
	text: string, // Обязательно для 'icon-text'
	icon: JSX.Element, // Обязательно для 'icon-text'
	onClick: () => void,
}


type PopoverProps = {
	items: PopoverItem[],
	onClose: () => void,
	anchorRef: React.RefObject<HTMLElement>,
}

const Popover: React.FC<PopoverProps> = ({
	items, onClose, anchorRef,
}) => {
	const [style, setStyle] = useState<React.CSSProperties>()
	const [isOpen, setIsOpen] = useState(false)
	const popoverRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const anchorRect = anchorRef.current?.getBoundingClientRect()
		const popoverWidth = popoverRef.current?.offsetWidth || 0
		if (anchorRect) {
			setStyle({
				top: anchorRect.bottom + window.scrollY,
				left: anchorRect.right + window.scrollX - popoverWidth,
			})
		}
	}, [anchorRef])

	useEffect(() => {
		// Запуск анимации открытия
		setIsOpen(true)

		const handleClickOutside = (event: MouseEvent) => {
			if (
				popoverRef.current
			&& !popoverRef.current.contains(event.target as Node)
			&& anchorRef.current
			&& !anchorRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
				setTimeout(onClose, 200) // Ждем завершения анимации перед закрытием
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [onClose, anchorRef])

	return (
		<div
			ref={popoverRef}
			className={joinStyles(styles.popover, isOpen
				? styles.open
				: '')}
			style={style}
		>
			{items.map((item, index) => (
				<React.Fragment key={getUID()}>
					<div
						className={styles.popoverItem}
						onClick={() => {
							item.onClick()
							setIsOpen(false)
							setTimeout(onClose, 200) // Ждем завершения анимации перед закрытием
						}}
					>
						{item.type === 'icon' && item.icon}
						{item.type === 'text' && (
							<span className={styles.text}>
								{item.text}
							</span>
						)}
						{item.type === 'icon-text' && (
							<>
								{item.icon}
								<span className={styles.text}>
									{item.text}
								</span>
							</>
						)}
					</div>
					{index < items.length - 1 && <div className={styles.separator} />}
				</React.Fragment>
			))}
		</div>
	)
}

export {
	Popover,
	type PopoverProps,
	type PopoverItem,
}
