import React from 'react'
import {joinStyles} from '../../utils/joinStyles'
import styles from './NumberField.module.css'

type NumberFieldProps = {
	value: number,
	onChange: (value: number) => void,
	className?: string,
	maxValue?: number,
}

const NumberField: React.FC<NumberFieldProps> = ({
	value,
	onChange,
	className,
	maxValue,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value, 10)
		if (!isNaN(newValue)) {
			if (maxValue !== undefined) {
				onChange(Math.min(newValue, maxValue))
			}
			else {
				onChange(newValue)
			}
		}
	}

	return (
		<input
			type="text"
			inputMode="numeric"
			pattern="[0-9]*"
			value={value}
			onChange={handleChange}
			className={joinStyles(styles.numberField, className)}
		/>
	)
}

export {NumberField}
