import { useRef } from 'react'
import { dispatch } from '../../store/editor'
import {setSlideAsSelected} from '../../store/methods'
import { EditorType } from '../../store/types'

import styles from './Collection.module.css'
import { Shell } from './Shell/Shell'

type CollectionProps = {
	editor: EditorType
}

function Collection({ editor }: CollectionProps) {
    const parentRef = useRef<HTMLDivElement>(null) // Ссылка на родительский контейнер
    return (
        <div
            className={styles.collection}
            ref={parentRef}
        >
            {editor.presentation.slides.map((slide) => (
                <Shell
                    editor={editor}
                    slide={slide}
                    key={slide.id}
                    parentRef={parentRef}
                    onClick={() => dispatch(setSlideAsSelected, { slideId: slide.id })}
                />
            ))}
        </div>
    )
}

export { Collection }
