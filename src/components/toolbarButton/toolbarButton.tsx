import styles from './toolbarButton.module.css'

type ToolbarButtonProps = {
	text: string
	onClick: () => void
	isDisabled?: boolean
}

function ToolbarButton({
    text, onClick, isDisabled, 
}: ToolbarButtonProps) {
    return (
        <button disabled={isDisabled} onClick={onClick} className={styles.button}>
            {text}
        </button>
    )
}

export { ToolbarButton }
