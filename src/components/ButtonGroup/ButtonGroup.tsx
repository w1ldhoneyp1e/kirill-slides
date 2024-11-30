import {
    Button, ButtonProps,
} from '../Button/Button'
import styles from './ButtonGroup.module.css'

type ButtonGroupProps = {
    items: ButtonProps[]; // Массив объектов с пропсами для Button
}

const ButtonGroup = ({ items }: ButtonGroupProps) => {
    return (
        <div className={styles.buttonGroup}>
            {items.map((itemProps, index) => (
                <div key={index}>
                    <Button {...itemProps} /> {/* Передаем пропсы для Button */}
                </div>
            ))}
        </div>
    )
}

export { ButtonGroup }
