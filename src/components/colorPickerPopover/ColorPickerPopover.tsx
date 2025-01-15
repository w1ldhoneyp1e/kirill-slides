import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import {Palette24px} from '../../assets/icons/Palette24px'
import {getUID} from '../../store/methods'
import {joinStyles} from '../../utils/joinStyles'
import {Button} from '../Button/Button'
import {Divider} from '../Divider/Divider'
import {PalettePopup} from '../PalettePopup/PalettePopup'
import styles from './ColorPickerPopover.module.css'

type ColorPickerProps = {
	value: string,
	onChange: (color: string) => void,
	onClose: () => void,
	anchorRef: React.RefObject<HTMLElement>,
}

const COLORS = [
	['#000000', '#757575', '#4B89FF', '#000000', '#757575', '#FFA500', '#00BCD4', '#FFEB3B'],
	['#000000', '#424242', '#666666', '#888888', '#AAAAAA', '#CCCCCC', '#EEEEEE', '#FFFFFF'],
	['#FF0000', '#FF4444', '#FF8888', '#FFCCCC', '#00FF00', '#44FF44', '#88FF88', '#CCFFCC'],
	['#0000FF', '#4444FF', '#8888FF', '#CCCCFF', '#FFFF00', '#FFFF44', '#FFFF88', '#FFFFCC'],
	['#800000', '#804400', '#808800', '#408000', '#004080', '#000080', '#400080', '#800080'],
]

function ColorPickerPopover({
	value,
	onChange,
	onClose,
	anchorRef,
}: ColorPickerProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [style, setStyle] = useState<React.CSSProperties>()
	const [paletteOpen, setPaletteOpen] = useState(false)
	const pickerRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const anchorRect = anchorRef.current?.getBoundingClientRect()
		const pickerWidth = pickerRef.current?.offsetWidth || 0
		if (anchorRect) {
			console.log('top: ', anchorRect.bottom + window.scrollY)
			console.log('left: ', anchorRect.right + window.scrollX - pickerWidth)
			setStyle({
				top: anchorRect.bottom + window.scrollY,
				left: anchorRect.right + window.scrollX - pickerWidth,
			})
		}
	}, [anchorRef])

	useEffect(() => {
		setIsOpen(true)

		const handleClickOutside = (event: MouseEvent) => {
			if (
				pickerRef.current
				&& !pickerRef.current.contains(event.target as Node)
				&& anchorRef.current
				&& !anchorRef.current.contains(event.target as Node)
				&& !paletteOpen
			) {
				setIsOpen(false)
				setTimeout(onClose, 200)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [onClose, anchorRef, paletteOpen])

	return (
		<div
			ref={pickerRef}
			className={joinStyles(
				styles.colorPicker,
				isOpen && styles.open,
			)}
			style={style}
		>
			<div className={styles.grid}>
				{COLORS.map(row => (
					<div
						key={getUID()}
						className={styles.row}
					>
						{row.map(color => (
							<button
								key={getUID()}
								className={joinStyles(
									styles.colorCell,
									color === value && styles.selected,
								)}
								style={{backgroundColor: color}}
								onClick={() => {
									onChange(color)
									onClose()
								}}
							/>
						))}
					</div>
				))}
			</div>
			<Divider
				type="horizontal"
				size="full"
			/>
			<Button
				type="icon-text"
				icon={<Palette24px />}
				text="Выбрать из палитры"
				state="default"
				onClick={() => {
					setPaletteOpen(true)
				}}
			/>
			<Divider
				type="horizontal"
				size="full"
			/>
			<Button
				type="text"
				text="Прозрачный"
				state="default"
				onClick={() => {
					onChange('transparent')
					onClose()
				}}
			/>
			{paletteOpen && (
				<PalettePopup
					value={value}
					onChange={onChange}
					onClose={() => setPaletteOpen(false)}
				/>
			)}
		</div>
	)
}

export {ColorPickerPopover}
