import { SlideType } from "../../store/types";
import styles from "./Slide.module.css"

type SlideProps = {
    slide: SlideType,
}

function Slide(props:SlideProps) {
    return (
        <div className={styles.slide}>
            {props.slide.id}
        </div>
    )
}

export {Slide};