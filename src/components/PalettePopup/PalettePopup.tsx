import {
	useCallback,
	useRef,
	useState,
} from 'react'
import {Minus24px} from '../../assets/icons/Minus24px'
import {Plus24px} from '../../assets/icons/Plus24px'
import {Button} from '../Button/Button'
import {NumberField} from '../numberField/NumberField'
import {Popup} from '../Popup/Popup'
import {TextField} from '../TextField/TextField'
import styles from './PalettePopup.module.css'

type PalettePopupProps = {
	value: string,
	onChange: (color: string) => void,
	onClose: () => void,
}

function PalettePopup({
	value, onChange, onClose,
}: PalettePopupProps) {
	const [color, setColor] = useState(value === 'transparent'
		? '#000000'
		: value)
	const [alpha, setAlpha] = useState(value === 'transparent'
		? 0
		: 100)
	const [hue, setHue] = useState(0)
	const [marker, setMarker] = useState<{
		x: number,
		y: number,
	}>({
		x: 0,
		y: 0,
	})
	const paletteRef = useRef<HTMLDivElement>(null)
	const hueRef = useRef<HTMLDivElement>(null)

	const updateColor = useCallback((h: number, x: number, y: number) => {
		const rect = paletteRef.current?.getBoundingClientRect()
		if (!rect) {
			return
		}

		const saturation = (x / rect.width) * 100
		const brightness = 100 - (y / rect.height) * 100

		const rgb = HSVtoRGB(h, saturation, brightness)
		setColor(RGBtoHex(rgb))
	}, [])

	const handlePaletteClick = useCallback((e: React.MouseEvent) => {
		const rect = paletteRef.current?.getBoundingClientRect()
		if (!rect) {
			return
		}

		const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
		const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))

		setMarker({
			x,
			y,
		})
		updateColor(hue, x, y)
	}, [hue, updateColor])

	const handleHueClick = useCallback((e: React.MouseEvent) => {
		const rect = hueRef.current?.getBoundingClientRect()
		if (!rect) {
			return
		}

		const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
		const newHue = (x / rect.width) * 360
		setHue(newHue)
		updateColor(newHue, marker.x, marker.y)
	}, [marker.x, marker.y, updateColor])

	const handleAccept = useCallback(() => {
		if (alpha === 0) {
			onChange('transparent')
		}
		else {
			onChange(color)
		}
		onClose()
	}, [color, alpha, onChange, onClose])

	return (
		<div className={styles.overlay}>
			<Popup
				title="Выбор цвета"
				onClose={onClose}
				width={400}
				footer={[
					{
						text: 'Отмена',
						onClick: onClose,
					},
					{
						text: 'ОК',
						onClick: handleAccept,
					},
				]}
			>
				<div className={styles.content}>
					<div
						ref={paletteRef}
						className={styles.palette}
						style={{backgroundColor: `hsl(${hue}, 100%, 50%)`}}
						onClick={handlePaletteClick}
					>
						<div className={styles.paletteOverlay} />
						<div
							className={styles.marker}
							style={{
								left: marker.x,
								top: marker.y,
							}}
						/>
					</div>
					<div
						ref={hueRef}
						className={styles.hueSlider}
						onClick={handleHueClick}
					>
						<div
							className={styles.hueHandle}
							style={{left: `${(hue / 360) * 100}%`}}
						/>
					</div>
					<div className={styles.controls}>
						<div className={styles.preview}>
							<div
								className={styles.previewColor}
								style={{
									backgroundColor: color,
									opacity: alpha / 100,
								}}
							/>
						</div>
						<div className={styles.values}>
							<div className={styles.hex}>
								<span>{'HEX'}</span>
								<TextField
									value={color.toUpperCase()}
									onChange={setColor}
								/>
							</div>
							<div className={styles.alpha}>
								<span>{'Прозрачность'}</span>
								<div className={styles.numberFieldContainer}>
									<NumberField
										value={alpha}
										onChange={setAlpha}
										maxValue={100}
									/>
									<Button
										type="icon"
										icon={Plus24px}
										onClick={() => setAlpha(Math.min(100, alpha + 1))}
										state={alpha >= 100
											? 'disabled'
											: 'default'}
									/>
									<Button
										type="icon"
										icon={Minus24px}
										onClick={() => setAlpha(Math.max(0, alpha - 1))}
										state={alpha <= 0
											? 'disabled'
											: 'default'}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Popup>
		</div>
	)
}

function HSVtoRGB(h: number, s: number, v: number) {
	s /= 100
	v /= 100
	const i = Math.floor(h / 60)
	const f = h / 60 - i
	const p = v * (1 - s)
	const q = v * (1 - f * s)
	const t = v * (1 - (1 - f) * s)

	let r = 0,
		g = 0,
		b = 0
	switch (i % 6) {
		case 0: r = v; g = t; b = p; break
		case 1: r = q; g = v; b = p; break
		case 2: r = p; g = v; b = t; break
		case 3: r = p; g = q; b = v; break
		case 4: r = t; g = p; b = v; break
		case 5: r = v; g = p; b = q; break
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
	}
}

function RGBtoHex({
	r, g, b,
}: {
	r: number,
	g: number,
	b: number,
}) {
	return '#' + [r, g, b].map(x => {
		const hex = x.toString(16)
		return hex.length === 1
			? '0' + hex
			: hex
	}).join('')
}

export {PalettePopup}
