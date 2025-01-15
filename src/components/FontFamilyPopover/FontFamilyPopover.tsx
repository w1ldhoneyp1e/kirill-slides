import {useCallback, useState} from 'react'
import {Font24px} from '../../assets/icons/Font24px'
import {BasePopover} from '../BasePopover/BasePopover'
import {EmptyState} from '../EmptyState/EmptyState'
import {PreloaderWrapper} from '../Preloader/PreloaderWrapper'
import {SearchField} from '../SearchField/SearchField'
import styles from './FontFamilyPopover.module.css'
import {useFontSearch} from './hooks/useFontSearch'

type FontFamilyPopoverProps = {
	value: string,
	onSelect: (font: string) => void,
	onClose: () => void,
	anchorRef: React.RefObject<HTMLElement>,
}

function FontFamilyPopover({
	value,
	onSelect,
	onClose,
	anchorRef,
}: FontFamilyPopoverProps) {
	const [searchValue, setSearchValue] = useState('')
	const {
		fonts, initialized, searchFonts, error,
	} = useFontSearch()

	const onSearch = useCallback(() => {
		searchFonts(searchValue)
	}, [searchValue, searchFonts])

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
					: (fonts.length || initialized === false)
						? initialized
							? (
								<div className={styles.fontList}>
									{fonts.map(font => (
										<div
											key={font}
											className={styles.fontItem}
											onClick={() => {
												onSelect(font)
												onClose()
											}}
											style={{fontFamily: font}}
										>
											{font}
										</div>
									))}
								</div>
							)
							: <PreloaderWrapper className={styles.preloader} />
						: <EmptyState
							icon={Font24px}
							size={80}
							height={200}
							width={280}
							message="Шрифты не найдены"
						/>}
			</div>
		</BasePopover>
	)
}

export {FontFamilyPopover}
