import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Cross24px} from '../../assets/icons/Cross24px'
import {Button} from '../../components/Button/Button'
import {BottomPanel} from './bottomPanel/BottomPanel'
import styles from './Player.module.css'
import {View} from './view/View'

function Player() {
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number | null>(null)

	const goTo = useNavigate()

	return (
		<div className={styles.player}>
			<View
				currentSlideIndex={currentSlideIndex}
				setCurrentSlideIndex={setCurrentSlideIndex}
			/>
			<BottomPanel
				currentIndex={currentSlideIndex}
				setCurrentIndex={setCurrentSlideIndex}
			/>
			<Button
				className={styles.backButton}
				type="icon"
				state="default"
				icon={Cross24px}
				onClick={() => goTo('/editor')}
			/>
		</div>
	)
}

export {
	Player,
}
