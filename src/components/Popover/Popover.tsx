import React from 'react'
import {getUID} from '../../store/methods'
import {BasePopover} from '../BasePopover/BasePopover'
import styles from './Popover.module.css'

type PopoverItem =
{
	type: 'text',
	text: string,
	icon?: never,
	onClick: () => void,
}
| {
	type: 'icon',
	icon: JSX.Element,
	text?: never,
	onClick: () => void,
}
| {
	type: 'icon-text',
	text: string,
	icon: JSX.Element,
	onClick: () => void,
}


type PopoverProps = {
	items: PopoverItem[],
	onClose: () => void,
	position?: {
		x: number,
		y: number,
	},
	anchorRef?: React.RefObject<HTMLElement>,
}

const Popover: React.FC<PopoverProps> = ({
	items,
	onClose,
	position,
	anchorRef,
}) => (
	<BasePopover
		onClose={onClose}
		position={position}
		anchorRef={anchorRef}
		className={styles.popover}
	>
		{items.map(item => (
			<div
				key={getUID()}
				className={styles.item}
				onMouseDown={e => {
					e.stopPropagation()
					e.preventDefault()
					item.onClick()
					onClose()
				}}
			>
				{item.type === 'icon-text' && (
					<>
						<span className={styles.icon}>{item.icon}</span>
						<span className={styles.text}>{item.text}</span>
					</>
				)}
				{item.type === 'text' && (
					<span className={styles.text}>{item.text}</span>
				)}
			</div>
		))}
	</BasePopover>
)

export {
	Popover,
	type PopoverProps,
	type PopoverItem,
}
