import styles from "./toolbarButton.module.css"

type ToolbarButtonProps = {
    text: string,
    onClick: () => void,
    key: string
}

function ToolbarButton(props:ToolbarButtonProps) {
    return (
        <button
            onClick={props.onClick} 
            className={styles.button}
        >
            {props.text}
        </button>
    )
}

export {ToolbarButton};