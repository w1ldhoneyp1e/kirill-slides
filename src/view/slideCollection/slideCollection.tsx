import { Slide } from "../../components/SlidePreview/Slide"
import { SlideType } from "../../store/types"
import styles from "./slideCollection.module.css"

type SlideCollectionProps = {
    collection: SlideType[],
}

function SlideCollection(props: SlideCollectionProps) {
    return (
        <div
            className={styles.collection}
        >
            {props.collection.map((slide) => 
                <Slide 
                    key={slide.id}
                    slide={slide}
                ></Slide>
            )}
        </div>
    )
}

export {SlideCollection};