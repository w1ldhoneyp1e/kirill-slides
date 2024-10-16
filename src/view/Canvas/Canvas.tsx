import { Slide } from "../../components/Slide/Slide";
import { SlideType } from "../../store/types";
import styles from "./Canvas.module.css"

type CanvasProps = {
    slide: SlideType,
}

function Canvas(props:CanvasProps) {
    return (
        <div className={styles.canvas}>
            <Slide
                slide={props.slide}
            >
            </Slide>
        </div>
    )
}

export {Canvas};