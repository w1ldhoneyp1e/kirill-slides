import styles from "./name.module.css";

type NameProps = {
    text: string,
}

function Name(props:NameProps) {
    return (
        <div className={styles.name}>
            {props.text}
        </div>
    )
}

export {Name};