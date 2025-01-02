import {useRef} from 'react'
import {useAppActions} from '../hooks/useAppActions'
import {useAppSelector} from '../hooks/useAppSelector'
import styles from './Collection.module.css'
import {Shell} from './Shell/Shell'

function Collection() {
	const slides = useAppSelector((editor => editor.presentation.slides))
	const {setSelection} = useAppActions()
	const parentRef = useRef<HTMLDivElement>(null)
	return (
		<div
			className={styles.collection}
			ref={parentRef}
		>
			{slides.map(slide => (
				<Shell
					slide={slide}
					key={slide.id}
					parentRef={parentRef}
					onClick={() => setSelection({
						type: 'slide',
						id: slide.id,
					})}
				/>
			))}
		</div>
	)
}

export {Collection}
