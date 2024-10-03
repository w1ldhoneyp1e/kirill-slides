import { ChooseOption } from "../../types"
import styles from "./toolbarSelect.module.css"

type ToolbarSelectProps = {
    text: string,
    options: ChooseOption[]
    key: string
}

function ToolbarSelect(props:ToolbarSelectProps) {
    return (
        <select key={props.key} className={styles.button}>
            {props.options.map((option) =>
                <option onClick={option.onClick} key={option.id}>
                    {option.text}
                </option>
            )}
        </select>
    )
}

export {ToolbarSelect};