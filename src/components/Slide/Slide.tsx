import { CSSProperties } from "react";
import { BackgroundType, SlideType } from "../../store/types";
import styles from "./Slide.module.css"

type SlideProps = {
    slide: SlideType,
    isSelected?: boolean,
}

function Slide({slide, isSelected}:SlideProps) {
    function setBackground(background: BackgroundType): string {
        let value: string = ''
        if (background.type === 'solid') value = background.hexColor
        if (background.type === 'image') value = `url(${background.src})`
        return value
    }
    console.log('slide  ', slide.background);
    const style: CSSProperties = {
        background: setBackground(slide.background)
    }
    if (isSelected) {
        style.border = '3px solid #0b57d0'
    }
    return (
        <div className={styles.slide} style={style}>
            {slide.id}
            {isSelected}
        </div>
    )
}

export {Slide};