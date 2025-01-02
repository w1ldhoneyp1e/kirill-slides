import {useAppActions} from '../../hooks/useAppActions'
import {useAppSelector} from '../../hooks/useAppSelector'
import styles from './Name.module.css'

function Name() {
	const {changePresentationName} = useAppActions()
	function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		changePresentationName(value)
	}
	const name = useAppSelector((editor => editor.presentation.name))
	return (
		<input
			value={name ?? 'Название презентации'}
			onChange={e => onTitleChange(e)}
			className={styles.name}
		/>
	)
}

export {Name}
