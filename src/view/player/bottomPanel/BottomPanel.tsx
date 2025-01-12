import {useCallback} from 'react'
import {ArrowNext24px} from '../../../assets/icons/ArrowNext24px'
import {ArrowPrev24px} from '../../../assets/icons/ArrowPrev24px'
import {Button} from '../../../components/Button/Button'
import {useAppSelector} from '../../hooks/useAppSelector'
import styles from './BottomPanel.module.css'

type BottomPanelProps = {
	currentIndex: number | null,
	setCurrentIndex: (index: number | null) => void,
}

function BottomPanel({
	currentIndex,
	setCurrentIndex,
}: BottomPanelProps) {
	const slides = useAppSelector(editor => editor.presentation.slides)

	const onBack = useCallback(() => {
		setCurrentIndex(currentIndex !== null
			? currentIndex - 1
			: null,
		)
	}, [currentIndex, setCurrentIndex])

	const onForward = useCallback(() => {
		setCurrentIndex(currentIndex !== null
			? currentIndex + 1
			: null,
		)
	}, [currentIndex, setCurrentIndex])

	return (
		<div className={styles.buttomPanel}>
			<Button
				type="icon"
				icon={ArrowPrev24px}
				onClick={onBack}
				state={
					currentIndex !== null && currentIndex > 0
						? 'default'
						: 'disabled'
				}
			/>
			<Button
				type="icon"
				icon={ArrowNext24px}
				onClick={onForward}
				state={
					currentIndex !== null && currentIndex < slides.length - 1
						? 'default'
						: 'disabled'
				}
			/>
		</div>
	)
}

export {
	BottomPanel,
}
