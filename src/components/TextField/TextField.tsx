import React from 'react'
import {joinStyles} from '../../utils/joinStyles'
import styles from './TextField.module.css'

type TextFieldProps = {
	value: string,
	onChange: (value: string) => void,
	className?: string,
}

const TextField: React.FC<TextFieldProps> = ({
	value,
	onChange,
	className,
}) => (
	<input
		type="text"
		value={value}
		onChange={e => onChange(e.target.value)}
		className={joinStyles(styles.textField, className)}
	/>
)

export {TextField}
