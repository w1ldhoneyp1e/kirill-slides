import { Collection } from '../Collection/Collection'
import { EditorSpace } from '../EditorSpace/EditorSpace'
import styles from './WorkSpace.module.css'

function WorkSpace() {
    return (
        <div className={styles.container}>
            <Collection />
            <EditorSpace />
        </div>
    )
}

export { WorkSpace }
