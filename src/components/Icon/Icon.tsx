import {type ReactNode} from 'react'
import styles from './Icon.module.css'

type IconProps = {
	width: number,
	height: number,
	children: ReactNode,
}

const Icon = ({
	width,
	height,
	children,
}: IconProps) => (
	<svg
		className={styles.svgElement}
		width={width}
		height={height}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		{children}
	</svg>
)

export {Icon}
