import React, {useEffect, useRef} from 'react'
import {Cross24px} from '../../assets/Cross24px'
import {RoundedCross24px} from '../../assets/RoundedCross24px'
import {getUID} from '../../store/methods'
import {Button} from '../Button/Button'
import Preloader from '../Preloader/Preloader'
import styles from './PopUp.module.css' // Здесь будут стили для попапа

// Типы для кнопок
type ButtonProps = {
	text: string,
	onClick: () => void,
	state?: 'default' | 'disable' | 'loading', // Статус кнопки
}

type PopUpProps = {
	onClose: () => void, // Функция для закрытия попапа
	title: string, // Заголовок попапа
	footer?: ButtonProps[], // Кнопки внизу попапа
	children: React.ReactNode, // Дочерние элементы
	className?: string, // Классы для стилизации попапа
}

const Popup: React.FC<PopUpProps> = ({
	onClose, title, footer, children, className,
}) => {
	const popUpRef = useRef<HTMLDivElement>(null)

	// Закрытие попапа при клике вне его области
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
		<div className={`${styles.overlay} ${className}`}>
			<div
				className={styles.popup}
				ref={popUpRef}
			>
				<div className={styles.header}>
					<h2>{title}</h2>
					<Button
						type="icon"
						icon={Cross24px}
						onClick={onClose}
					/>
				</div>
				<div className={styles.body}>{children}</div>
				{footer && (
					<div className={styles.footer}>
						{footer.map(button => (
							<button
								key={getUID()}
								className={styles[`button-${button.state || 'default'}`]}
								onClick={button.onClick}
								disabled={button.state === 'disable'}
							>
								{button.state === 'loading'
									? <Preloader />
									: button.text}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export {Popup}
