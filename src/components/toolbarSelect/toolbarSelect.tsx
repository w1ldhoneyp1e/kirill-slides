import {type ChooseOptionType} from '../../store/types'
import styles from './toolbarSelect.module.css'

type ToolbarSelectProps = {
	text: string,
	options: ChooseOptionType[],
	key: string,
}

function ToolbarSelect(props: ToolbarSelectProps) {
	return (
		<select className={styles.button}>
			{props.options.map(option => (
				<option
					onClick={option.onClick}
					key={option.id}
				>
					{option.text}
				</option>
			))}
		</select>
	)
}

export {ToolbarSelect}
