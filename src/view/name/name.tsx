import styles from "./name.module.css";

type NameProps = {
    text: string,
    key: string
}

function Name(props:NameProps) {
    return (
        <div key={props.key} className={styles.name}>
            {props.text}
        </div>
    )
}

export {Name};