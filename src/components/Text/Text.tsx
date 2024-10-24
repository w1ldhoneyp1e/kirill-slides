import { dispatch } from '../../store/editor'
import { setObjectAsSelected } from '../../store/methods'
import { TextType } from '../../store/types'
import styles from './Text.module.css'

type TextProps = {
	textObj: TextType
	isSelected: boolean
}

function Text({ textObj, isSelected }: TextProps) {
	const style = {
		color: textObj.hexColor,
		fontSize: textObj.fontSize,
		width: textObj.size.width,
		height: textObj.size.height,
		border: isSelected ? '2px solid black' : '',
	}

	return (
		<div
			className={styles.textObj}
			style={style}
			onClick={() => dispatch(setObjectAsSelected, { id: textObj.id })}
		>
			{textObj.value}
		</div>
	)
}

export { Text }
