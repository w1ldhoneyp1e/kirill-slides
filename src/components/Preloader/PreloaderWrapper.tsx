import React from 'react'
import {joinStyles} from '../../utils/joinStyles'
import Preloader from './Preloader'
import styles from './PreloaderWrapper.module.css'

type PreloaderWrapperProps = {
	className?: string,
	width?: number | string,
	height?: number | string,
}

const PreloaderWrapper: React.FC<PreloaderWrapperProps> = ({
	className,
	width = '100%',
	height = '100%',
}) => (
	<div
		className={joinStyles(styles.wrapper, className)}
		style={{
			width,
			height,
		}}
	>
		<Preloader />
	</div>
)

export {PreloaderWrapper}
