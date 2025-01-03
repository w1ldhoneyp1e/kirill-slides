import React from 'react'
import styles from './EmptyState.module.css'

type EmptyStateProps = {
	icon: React.ReactNode,
	message: string,
	width?: number,
	height?: number,
	size?: number,
}

const EmptyState: React.FC<EmptyStateProps> = ({
	icon,
	message,
	width,
	height,
	size,
}) => (
	<div
		className={styles.emptyStateContainer}
		style={{
			width,
			height,
		}}
	>
		<div
			style={{
				width: size,
				height: size,
			}}
		>
			{icon}
		</div>
		<p className={styles.text}>{message}</p>
	</div>
)

export {EmptyState}
