import { PresentationType } from "../../store/types";
import { SlideCollection } from "../SlideCollection/SlideCollection";
import { SlideEditorSpace } from "../SlideEditorSpace/SlideEditorSpace";
import styles from "./lowerContainer.module.css"

type LowerContainerProps = {
    presentation: PresentationType
}

function LowerContainer(props:LowerContainerProps) {
    return (
        <div className={styles.container}>
            <SlideCollection
                collection={props.presentation.slides}
            />
            <SlideEditorSpace
                slide={props.presentation.slides[0]}
            />
        </div>
    )
}

export {LowerContainer};