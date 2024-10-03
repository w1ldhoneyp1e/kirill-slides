import { getUID } from "../../methods";
import { Presentation } from "../../types";
import { SlideCollection } from "../slideCollection/slideCollection";
import { SlideEditorSpace } from "../slideEditorSpace/slideEditorSpace";
import styles from "./lowerContainer.module.css"

type LowerContainerProps = {
    key: string,//
    presentation: Presentation
}

function LowerContainer(props:LowerContainerProps) {
    return (
        <div key={props.key} className={styles.container}>//
            <SlideCollection
                collection={props.presentation.slides}
                key={getUID()}
            />
            <SlideEditorSpace
                key={getUID()}
                slide={props.presentation.slides[0]}
            />
        </div>
    )
}

export {LowerContainer};