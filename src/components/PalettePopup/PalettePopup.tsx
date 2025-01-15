import {
	useCallback,
	useRef,
	useState,
} from 'react'
import {useDragAndDrop} from '../../view/hooks/useDragAndDrop'
import {Popup} from '../Popup/Popup'
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
	const paletteRef = useRef<HTMLDivElement>(null)
	const hueRef = useRef<HTMLDivElement>(null)

	const handlePaletteMove = useCallback(({x, y}) => {
		const rect = paletteRef.current?.getBoundingClientRect()
		if (!rect) {
			return
		}

		const saturation = Math.max(0, Math.min(x, rect.width)) / rect.width * 100
		const brightness = 100 - (Math.max(0, Math.min(y, rect.height)) / rect.height * 100)

		const rgb = HSVtoRGB(hue, saturation, brightness)
		setColor(RGBtoHex(rgb))
	}, [hue])

	const handleHueMove = useCallback(({x}) => {
		const rect = hueRef.current?.getBoundingClientRect()
		if (!rect) {
			return
		}

		const newHue = Math.max(0, Math.min(x, rect.width)) / rect.width * 360
		setHue(newHue)
	}, [])

	useDragAndDrop({
		ref: paletteRef,
		onMouseMove: handlePaletteMove,
	})

	useDragAndDrop({
		ref: hueRef,
		onMouseMove: handleHueMove,
	})

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
					>
						<div className={styles.paletteOverlay} />
					</div>
					<div
						ref={hueRef}
						className={styles.hueSlider}
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
								<input
									type="text"
									value={color.toUpperCase()}
									onChange={e => setColor(e.target.value)}
								/>
							</div>
							<div className={styles.alpha}>
								<span>{'Прозрачность'}</span>
								<input
									type="number"
									min={0}
									max={100}
									value={alpha}
									onChange={e => setAlpha(Number(e.target.value))}
								/>
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
