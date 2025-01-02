import {getUID} from '../../store/methods'
import {type ButtonProps, Button} from '../Button/Button'
import styles from './ButtonGroup.module.css'

type ButtonGroupProps = {
	items: ButtonProps[],
}

const ButtonGroup = ({items}: ButtonGroupProps) => (
	<div className={styles.buttonGroup}>
		{items.map(itemProps => (
			<div key={getUID()}>
				<Button {...itemProps} /> {/* Передаем пропсы для Button */}
			</div>
		))}
	</div>
)

export {ButtonGroup}
