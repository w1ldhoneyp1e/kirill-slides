import { Slide } from "../../store/types";
import styles from "./SlidePreview.module.css"

type SlideProps = {
    slide: Slide,
}

function SlidePreview(props:SlideProps) {
    return (
        <div className={styles.slide}>
            {props.slide.id}
        </div>
    )
}

export {SlidePreview};