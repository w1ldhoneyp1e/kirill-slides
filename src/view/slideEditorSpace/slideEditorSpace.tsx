import { Slide } from "../../components/SlidePreview/Slide";
import { SlideType } from "../../store/types";
import styles from "./slideEditorSpace.module.css"

type SlideEditorSpaceProps = {
    slide: SlideType,
}

function SlideEditorSpace(props:SlideEditorSpaceProps) {
    return (
        <div className={styles.canvas}>
            <Slide
                slide={props.slide}
            >
            </Slide>
        </div>
    )
}

export {SlideEditorSpace};