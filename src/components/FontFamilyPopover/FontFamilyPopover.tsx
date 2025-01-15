import {useCallback, useState} from 'react'
import {Font24px} from '../../assets/icons/Font24px'
import {useFontCache} from '../../hooks/useFontCache'
import {BasePopover} from '../BasePopover/BasePopover'
import {EmptyState} from '../EmptyState/EmptyState'
import {PreloaderWrapper} from '../Preloader/PreloaderWrapper'
import {TextField} from '../TextField/TextField'
import styles from './FontFamilyPopover.module.css'

type FontFamilyPopoverProps = {
	onSelect: (font: string) => void,
	onClose: () => void,
	anchorRef: React.RefObject<HTMLElement>,
	fonts: string[],
	initialized: boolean,
	error: string | null,
	onSearch: (query: string) => void,
}

function FontFamilyPopover({
	onSelect,
	onClose,
	anchorRef,
	fonts,
	initialized,
	error,
	onSearch,
}: FontFamilyPopoverProps) {
	const {addToCache} = useFontCache()
	const [searchValue, setSearchValue] = useState('')

	const handleSearch = useCallback((query: string) => {
		setSearchValue(query)
		onSearch(query)
	}, [onSearch])

	const handleSelect = useCallback(async (font: string) => {
		try {
			await addToCache(font, 'regular')
			onSelect(font)
			onClose()
		}
		catch (err) {
			console.error('Ошибка при загрузке шрифта:', err)
		}
	}, [onSelect, onClose, addToCache])

	return (
		<BasePopover
			onClose={onClose}
			anchorRef={anchorRef}
			className={styles.popover}
		>
			<TextField
				className={styles.searchField}
				value={searchValue}
				onChange={handleSearch}
				placeholder="Поиск шрифтов..."
			/>
			<div className={styles.content}>
				{error
					? (
						<EmptyState
							icon={Font24px}
							size={80}
							height={200}
							width={300}
							message={error}
						/>
					)
					: fonts.length || initialized === false
						? (
							initialized
								? (
									<div className={styles.list}>
										{fonts.map(font => (
											<div
												key={font}
												className={styles.item}
												onClick={() => handleSelect(font)}
												style={{fontFamily: font}}
											>
												<span className={styles.text}>{font}</span>
											</div>
										))}
									</div>
								)
								: (
									<PreloaderWrapper className={styles.preloader} />
								)
						)
						: (
							<EmptyState
								icon={Font24px}
								size={80}
								height={200}
								width={280}
								message="Шрифты не найдены"
							/>
						)}
			</div>
		</BasePopover>
	)
}

export {FontFamilyPopover}
