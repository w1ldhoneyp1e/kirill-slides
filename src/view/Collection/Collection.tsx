import {useRef} from 'react'
import {useAppActions} from '../hooks/useAppActions'
import {useAppSelector} from '../hooks/useAppSelector'
import styles from './Collection.module.css'
import {Shell} from './Shell/Shell'

function Collection() {
	const slides = useAppSelector((editor => editor.presentation.slides))
	const {
		setSelection,
		deselect,
	} = useAppActions()
	const parentRef = useRef<HTMLDivElement>(null)
	return (
		<div
			className={styles.collection}
			ref={parentRef}
			onClick={
				e => {
					if (e.defaultPrevented) {
						return
					}
					deselect({type: 'slide'})
					e.preventDefault()
				}
			}
		>
			{slides.map(slide => (
				<Shell
					slideId={slide.id}
					key={slide.id}
					parentRef={parentRef}
					onClick={e => {
						setSelection({
							type: 'slide',
							id: slide.id,
						})
						e.preventDefault()
					}}
				/>
			))}
		</div>
	)
}

export {Collection}
