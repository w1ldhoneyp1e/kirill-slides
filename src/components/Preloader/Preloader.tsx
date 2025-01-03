import React from 'react'
import styles from './Preloader.module.css' // Стили для прелоадера

const Preloader: React.FC = () => (
	<div className={styles.preloader} /> // Это может быть анимированная точка или спиннер
)

export default Preloader
