import { CSSProperties } from "react";
import { BackgroundType, EditorType, PictureType, SlideType, TextType } from "../../store/types";
import { Text } from "../Text/Text";
import { Picture } from "../Picture/Picture";
import styles from "./Slide.module.css"

type SlideProps = {
    editor: EditorType,
    slide: SlideType,
    isSelected?: boolean,
}

function Slide({ slide, isSelected, editor }: SlideProps) {
    function setBackground(background: BackgroundType): string {
        let value: string = ''
        if (background.type === 'solid') value = background.hexColor
        if (background.type === 'image') value = `url(${background.src})`
        return value
    }

    const style: CSSProperties = {
        background: setBackground(slide.background)
    }

    if (isSelected) {
        style.border = '3px solid #0b57d0'
    }

    return (
        <div className={styles.slide} style={style}>
            {slide.id}
            {slide.contentObjects.map((obj: TextType | PictureType) => {
                if (obj.type === 'text') {
                    return (
                        <Text
                            key={obj.id}
                            textObj={obj}
                            isSelected={!!editor.selection.selectedObjIds.includes(obj.id)}
                        />
                    );
                } else if (obj.type === 'picture') {
                    return (
                        <Picture
                            key={obj.id}
                            pictureObj={obj}
                            isSelected={!!editor.selection.selectedObjIds.includes(obj.id)}
                        />
                    );
                } else {
                    return null
                }
            })}
        </div>
    )
}

export { Slide };