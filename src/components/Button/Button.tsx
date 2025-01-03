import {
	type ReactNode,
	type Ref,
	forwardRef,
} from 'react'
import {joinStyles} from '../../utils/joinStyles'
import Preloader from '../Preloader/Preloader' // Импортируем компонент прелоадера
import styles from './Button.module.css'

  type ButtonType = 'icon' | 'icon-text' | 'text' | 'text-icon' | 'icon-icon'

type ButtonProps = {
	state: 'default' | 'disabled' | 'loading', // Теперь state обязательный
	ref?: Ref<HTMLButtonElement>,
	className?: string, // Добавляем возможность передавать className
} & ({
	type: 'icon',
	onClick: () => void,
	icon: ReactNode,
} | {
	type: 'icon-text',
	onClick: () => void,
	icon: ReactNode,
	text: string,
} | {
	type: 'text-icon',
	onClick: () => void,
	onIconClick?: () => void,
	icon: ReactNode,
	text: string,
} | {
	type: 'text',
	onClick: () => void,
	text: string,
} | {
	type: 'icon-icon',
	firstIcon: {
		icon: ReactNode,
		onClick: () => void,
	},
	secondIcon: {
		icon: ReactNode,
		onClick: () => void,
	},
})

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		type, state, className,
	} = props // теперь className передается через props

	// Основной класс кнопки с учетом состояния и className
	const buttonClass = joinStyles(styles.button, state === 'disabled' && styles.disabled, className)

	// Визуализация кнопки в зависимости от типа и состояния
	switch (type) {
		case 'icon':
			return (
				<button
					ref={ref}
					className={joinStyles(buttonClass, styles.buttonIcon)}
					onClick={state === 'loading' || state === 'disabled'
						? undefined
						: props.onClick}
					disabled={state === 'disabled'}
				>
					{state === 'loading'
						? <Preloader />
						: props.icon}
				</button>
			)

		case 'icon-text':
			return (
				<button
					ref={ref}
					className={buttonClass}
					onClick={state === 'loading' || state === 'disabled'
						? undefined
						: props.onClick}
					disabled={state === 'disabled'}
				>
					{state === 'loading'
						? <Preloader />
						: props.icon}
					<span>{props.text}</span>
				</button>
			)

		case 'text-icon':
			return (
				<button
					ref={ref}
					className={buttonClass}
					onClick={state === 'loading' || state === 'disabled'
						? undefined
						: props.onClick}
					disabled={state === 'disabled'}
				>
					<span>{props.text}</span>
					<span
						onClick={e => {
							if (state !== 'loading' && state !== 'disabled') {
								e.stopPropagation()
								props.onIconClick?.()
							}
						}}
					>
						{props.icon}
					</span>
				</button>
			)

		case 'text':
			return (
				<button
					ref={ref}
					className={joinStyles(buttonClass, styles.buttonText)}
					onClick={state === 'loading' || state === 'disabled'
						? undefined
						: props.onClick}
					disabled={state === 'disabled'}
				>
					{state === 'loading'
						? <Preloader />
						: props.text}
				</button>
			)

		case 'icon-icon':
			return (
				<div className={joinStyles(styles.buttonIconIcon, state === 'disabled' && styles.disabled)}>
					<span
						className={styles.icon}
						onClick={e => {
							if (state !== 'loading' && state !== 'disabled') {
								e.stopPropagation()
								props.firstIcon.onClick()
							}
						}}
					>
						{props.firstIcon.icon}
					</span>
					<span
						className={styles.icon}
						onClick={e => {
							if (state !== 'loading' && state !== 'disabled') {
								e.stopPropagation()
								props.secondIcon.onClick()
							}
						}}
					>
						{props.secondIcon.icon}
					</span>
				</div>
			)

		default:
			return <></>
	}
})

export {Button}
export type {ButtonType, ButtonProps}
