import { SlidePreview } from "../SlidePreview/SlidePreview";
import { Slide } from "../../types";
import styles from "./slideCollection.module.css"

type SlideCollectionProps = {
    collection: Slide[],
    key: string
}

function SlideCollection(props: SlideCollectionProps) {
    return (
        <div
            key={props.key}
            className={styles.collection}
        >
            {props.collection.map((slide) => 
                <SlidePreview 
                    key={slide.id}
                    slide={slide}
                ></SlidePreview>
            )}
        </div>
    )
}

export {SlideCollection};