import { Slide } from "../../types";
import styles from "./slideEditorSpace.module.css"

type SlideEditorSpaceProps = {
    slide: Slide,
    key: string
}

function SlideEditorSpace(props:SlideEditorSpaceProps) {
    return (
        <div key={props.key} className={styles.canvas}>
            
        </div>
    )
}

export {SlideEditorSpace};