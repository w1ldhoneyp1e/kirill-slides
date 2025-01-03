import React, {useEffect, useState} from 'react'
import {Search24px} from '../../assets/Search24px' // Импорт иконки поиска
import {Button} from '../../components/Button/Button' // Импорт компонента Button
import styles from './SearchField.module.css' // Подключаем стили

type SearchFieldProps = {
	onInput: (query: string) => void,
	onSearch: () => void,
	placeholder?: string, // Добавляем пропс для placeholder
}

const SearchField: React.FC<SearchFieldProps> = ({
	onSearch,
	onInput,
	placeholder = 'Введите запрос...',
}) => {
	const [query, setQuery] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value) // Обновляем состояние при вводе текста
	}

	useEffect(() => {
		onInput(query)
	}, [onInput, query])

	return (
		<div className={styles.searchContainer}>
			<input
				type="text"
				value={query}
				onInput={handleChange}
				placeholder={placeholder} // Используем переданный placeholder
				className={styles.searchInput}
			/>
			<Button
				type="icon"
				icon={Search24px} // Прокидываем иконку
				state={query.trim()
					? 'default'
					: 'disabled'} // Блокируем кнопку, если поле пустое
				onClick={onSearch} // Обработчик клика для поиска
				className={styles.searchButton}
			/>
		</div>
	)
}

export {SearchField}
