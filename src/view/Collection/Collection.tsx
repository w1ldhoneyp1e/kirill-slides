import { Slide } from '../../components/Slide/Slide'
import { dispatch } from '../../store/editor'
import { deselectSlide, setSlideAsSelected } from '../../store/methods'
import { EditorType, SelectionType, SlideType } from '../../store/types'
import styles from './Collection.module.css'

type CollectionProps = {
	editor: EditorType
	collection: SlideType[]
	selection: SelectionType
}

function Collection({ collection, selection, editor }: CollectionProps) {
	return (
		<div
			className={styles.collection}
			onMouseDown={() => dispatch(deselectSlide)}
		>
			{collection.map((slide) => (
				<div
					className={styles.shell}
					key={slide.id}
					onClick={() => dispatch(setSlideAsSelected, { slideId: slide.id })}
				>
					<Slide
						editor={editor}
						slide={slide}
						isSelected={slide.id == selection.selectedSlideId}
					></Slide>
				</div>
			))}
		</div>
	)
}

export { Collection }
