import {useCallback, useState} from 'react'
import {Font24px} from '../../assets/icons/Font24px'
import {BasePopover} from '../BasePopover/BasePopover'
import {EmptyState} from '../EmptyState/EmptyState'
import Preloader from '../Preloader/Preloader'
import {SearchField} from '../SearchField/SearchField'
import styles from './FontFamilyPopover.module.css'

type FontFamilyPopoverProps = {
	value: string,
	onChange: (font: string) => void,
	onClose: () => void,
	anchorRef: React.RefObject<HTMLElement>,
}

function FontFamilyPopover({
	value,
	onChange,
	onClose,
	anchorRef,
}: FontFamilyPopoverProps) {
	const [searchValue, setSearchValue] = useState('')
	const [isLoading, setLoading] = useState(false)
	const [fonts, setFonts] = useState<string[]>([])
	const [initialized, setInitialized] = useState(false)

	const onSearch = useCallback(() => {
		setLoading(true)
		// Здесь будет запрос на поиск шрифтов
		setLoading(false)
		setInitialized(true)
	}, [searchValue])

	return (
		<BasePopover
			onClose={onClose}
			anchorRef={anchorRef}
			className={styles.fontFamilyPopover}
		>
			<SearchField
				className={styles.searchField}
				onInput={setSearchValue}
				onSearch={onSearch}
				placeholder="Поиск шрифтов..."
			/>
			<div className={styles.content}>
				{(fonts.length || initialized === false)
					? initialized
						? (
							<div className={styles.fontList}>
								{fonts.map(font => (
									<div
										key={font}
										className={styles.fontItem}
										onClick={() => {
											onChange(font)
											onClose()
										}}
									>
										{font}
									</div>
								))}
							</div>
						)
						: <Preloader />
					: <EmptyState
						icon={Font24px}
						size={120}
						height={300}
						width={400}
						message="Шрифты не найдены"
					/>}
			</div>
		</BasePopover>
	)
}

export {FontFamilyPopover}
