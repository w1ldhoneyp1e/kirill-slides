import React from 'react'
import {joinStyles} from '../../utils/joinStyles'
import styles from './TextField.module.css'

type TextFieldProps = {
	value: string,
	onChange: (value: string) => void,
	placeholder?: string,
	className?: string,
}

const TextField: React.FC<TextFieldProps> = ({
	value,
	onChange,
	placeholder = 'Введите текст...',
	className,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<input
			type="text"
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
			className={joinStyles(styles.textField, className)}
		/>
	)
}

export {TextField}
