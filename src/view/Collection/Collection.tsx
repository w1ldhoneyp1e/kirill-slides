import { Slide } from "../../components/Slide/Slide";
import { dispatch } from "../../store/editor";
import { setSlideAsSelected } from "../../store/methods";
import { SelectionType, SlideType } from "../../store/types"
import styles from "./Collection.module.css"

type CollectionProps = {
    collection: SlideType[],
    selection: SelectionType,
}

function Collection({collection, selection}: CollectionProps) {
    return (
        <div className={styles.collection}>
            {collection.map((slide) => 
                <div 
                    className={styles.shell}
                    key={slide.id}    
                    onClick={() => dispatch(setSlideAsSelected, {slideId: slide.id})}
                >
                    <Slide
                        slide={slide}
                        isSelected={slide.id == selection.selectedSlideId}
                    >
                    </Slide>
                </div>
            )}
        </div>
    )
}

export {Collection};