import { ReactElement } from 'react'
import { Button } from './Button' // Укажите путь до компонента Button

type ButtonGroupProps = {
    items: ReactElement<typeof Button>[]; // Массив элементов Button
};

const ButtonGroup = ({items}: ButtonGroupProps) => {
    return (
        <div className="button-group">
            {items.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    )
}

export {ButtonGroup}
