import { EditorType } from '../../store/types'
import { Collection } from '../Collection/Collection'
import { EditorSpace } from '../EditorSpace/EditorSpace'

import styles from './WorkSpace.module.css'

type WorkSpaceProps = {
	editor: EditorType
}

function WorkSpace({ editor }: WorkSpaceProps) {
    return (
        <div className={styles.container}>
            <Collection editor={editor} />
            <EditorSpace editor={editor} />
        </div>
    )
}

export { WorkSpace }
