import {
	type ReactNode,
	type Ref,
	forwardRef,
} from 'react'
import {joinStyles} from '../../utils/joinStyles'
import Preloader from '../Preloader/Preloader'
import styles from './Button.module.css'

  type ButtonType = 'icon' | 'icon-text' | 'text' | 'text-icon' | 'icon-icon'

type ButtonProps = {
	state: 'default' | 'disabled' | 'loading',
	ref?: Ref<HTMLButtonElement>,
	className?: string,
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
	type: 'icon-text-icon',
	onClick: () => void,
	icon: ReactNode,
	text: string,
	rightIcon: ReactNode,
	onRightIconClick: () => void,
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
	} = props

	const buttonClass = joinStyles(styles.button, state === 'disabled' && styles.disabled, className)

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
					<span className={styles.text}>{props.text}</span>
				</button>
			)

		case 'text-icon':
			return (
				<button
					ref={ref}
					className={joinStyles(buttonClass, styles.text)}
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
					className={joinStyles(buttonClass, styles.text)}
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

		case 'icon-text-icon':
			return (
				<div className={buttonClass}>
					<button
						ref={ref}
						className={joinStyles(styles.innerButton, styles.leftButton, styles.buttonContainer)}
						onClick={state === 'loading' || state === 'disabled'
							? undefined
							: props.onClick}
						disabled={state === 'disabled'}
					>
						{state === 'loading'
							? <Preloader />
							: (
								<>
									{props.icon && <span className={styles.icon}>{props.icon}</span>}
									<span className={styles.text}>{props.text}</span>
								</>
							)}
					</button>
					<button
						className={joinStyles(styles.innerButton, styles.rightButton)}
						onClick={state === 'loading' || state === 'disabled'
							? undefined
							: props.onRightIconClick}
						disabled={state === 'disabled'}
					>
						{props.rightIcon}
					</button>
				</div>
			)

		default:
			return <></>
	}
})

export {Button}
export type {ButtonType, ButtonProps}
