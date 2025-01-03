import React, {
	type ReactNode,
	type Ref,
	forwardRef,
} from 'react'
import {joinStyles} from '../../utils/joinStyles'
import styles from './Button.module.css'

type ButtonType = 'icon' | 'icon-text' | 'text' | 'text-icon' | 'icon-icon'

type ButtonProps = {
	disable?: boolean,
	ref?: Ref<HTMLButtonElement>,
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
	const {type, disable} = props

	const buttonClass = joinStyles(styles.button, disable && styles.disabled)

	switch (type) {
		case 'icon':
			return (
				<button
					ref={ref}
					className={joinStyles(buttonClass, styles.buttonIcon)}
					onClick={!disable
						? props.onClick
						: undefined}
					disabled={disable}
				>
					{props.icon}
				</button>
			)

		case 'icon-text':
			return (
				<button
					ref={ref}
					className={buttonClass}
					onClick={!disable
						? props.onClick
						: undefined}
					disabled={disable}
				>
					{props.icon}
					<span>{props.text}</span>
				</button>
			)

		case 'text-icon':
			return (
				<button
					ref={ref}
					className={buttonClass}
					onClick={!disable
						? props.onClick
						: undefined}
					disabled={disable}
				>
					<span>{props.text}</span>
					<span
						onClick={e => {
							if (!disable) {
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
					onClick={!disable
						? props.onClick
						: undefined}
					disabled={disable}
				>
					{props.text}
				</button>
			)

		case 'icon-icon':
			return (
				<div className={joinStyles(styles.buttonIconIcon, disable && styles.disabled)}>
					<span
						className={styles.icon}
						onClick={e => {
							if (!disable) {
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
							if (!disable) {
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
