import { EditorType } from '../../store/types'
import { Name } from '../Name/Name'
import { Toolbar } from '../Toolbar/Toolbar'
import styles from './upperContainer.module.css'

type UpperContainerProps = {
	editor: EditorType
}

function UpperContainer({ editor }: UpperContainerProps) {
	return (
		<div className={styles.container}>
			<div className={styles.name}>
				<Name text={editor.presentation.name} />
			</div>
			<Toolbar editor={editor} />
		</div>
	)
}

export { UpperContainer }
