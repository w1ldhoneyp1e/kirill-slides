import { dispatch } from '../../store/editor'
import { changePresentationName } from '../../store/methods'
import styles from './name.module.css'

type NameProps = {
	text: string
}

function Name({ text }: NameProps) {
	function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		dispatch(changePresentationName, { newName: value })
	}
	return (
		<input
			value={text ?? 'Название презентации'}
			onChange={(e) => onTitleChange(e)}
			className={styles.name}
		/>
	)
}

export { Name }
