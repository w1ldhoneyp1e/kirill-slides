import React, {useEffect, useRef} from 'react'
import {Cross24px} from '../../assets/icons/Cross24px'
import {getUID} from '../../store/methods'
import {joinStyles} from '../../utils/joinStyles'
import {Button} from '../Button/Button'
import {PopupLayer} from '../PopupLayer/PopupLayer'
import styles from './Popup.module.css'

type ButtonProps = {
	text: string,
	onClick: () => void,
	state?: 'default' | 'disabled' | 'loading',
}

type PopUpProps = {
	onClose: () => void,
	title: string,
	footer?: ButtonProps[],
	children: React.ReactNode,
	className?: string,
	width?: number | string,
}

const Popup: React.FC<PopUpProps> = ({
	onClose,
	title,
	footer,
	children,
	className,
	width,
}) => {
	const popUpRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	return (
		<PopupLayer>
			<div className={styles.overlay}>
				<div
					className={styles.popup}
					ref={popUpRef}
					style={{width}}
				>
					<h2 className={styles.title}>{title}</h2>
					<Button
						type="icon"
						icon={Cross24px}
						state="default"
						onClick={onClose}
						className={styles.closeButtonOutside}
					/>
					<div className={joinStyles(styles.body, className)}>{children}</div>
					{footer && (
						<div className={styles.footer}>
							{footer.map(button => (
								<Button
									key={getUID()}
									className={styles.footerButtons}
									type="text"
									text={button.text}
									state={button.state || 'default'}
									onClick={button.onClick}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</PopupLayer>
	)
}

export {Popup}
