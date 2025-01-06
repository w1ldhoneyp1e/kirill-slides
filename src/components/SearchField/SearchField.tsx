import React, {useEffect, useState} from 'react'
import {Search24px} from '../../assets/Search24px'
import {Button} from '../../components/Button/Button'
import {joinStyles} from '../../utils/joinStyles'
import styles from './SearchField.module.css'

type SearchFieldProps = {
	onInput: (query: string) => void,
	onSearch: () => void,
	placeholder?: string,
	className?: string,
}

const SearchField: React.FC<SearchFieldProps> = ({
	onSearch,
	onInput,
	placeholder = 'Введите запрос...',
	className,
}) => {
	const [query, setQuery] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	useEffect(() => {
		onInput(query)
	}, [onInput, query])

	return (
		<div className={joinStyles(styles.searchContainer, className)}>
			<input
				type="text"
				value={query}
				onInput={handleChange}
				placeholder={placeholder}
				className={styles.searchInput}
			/>
			<Button
				type="icon"
				icon={Search24px}
				state={query.trim()
					? 'default'
					: 'disabled'}
				onClick={onSearch}
				className={styles.searchButton}
			/>
		</div>
	)
}

export {SearchField}
