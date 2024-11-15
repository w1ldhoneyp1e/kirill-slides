import { EditorType } from '../../store/types'
import { Collection } from '../Collection/Collection'
import { EditorSpace } from '../EditorSpace/EditorSpace'

import styles from './lowerContainer.module.css'

type LowerContainerProps = {
	editor: EditorType
}

function LowerContainer({ editor }: LowerContainerProps) {
    return (
        <div className={styles.container}>
            <Collection
                editor={editor}
                collection={editor.presentation.slides}
                selection={editor.selection}
            />
            <EditorSpace editor={editor} />
        </div>
    )
}

export { LowerContainer }
