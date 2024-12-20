import {
    CSSProperties, useRef,
} from 'react'
import {
    BackgroundType,
    PictureType,
    SlideType,
    TextType,
} from '../../store/types'
import { Text } from '../Text/Text'
import { Picture } from '../Picture/Picture'

import styles from './Slide.module.css'

type SlideProps = {
	slide: SlideType
	scale?: number
}

function Slide({
    slide,
    scale = 1,
}: SlideProps) {
    const parentRef = useRef<HTMLDivElement>(null)

    const contentObjects = slide.contentObjects

    function setBackground(background: BackgroundType): string {
        let value: string = ''
        if (background.type === 'solid') value = background.hexColor
        if (background.type === 'image') value = `url(${background.src})`
        return value
    }

    const style: CSSProperties = slide
        ? {background: setBackground(slide.background)}
        : {}

    return (
        <div
            className={styles.slide}
            style={style}
            ref={parentRef}
        >
            {contentObjects
                ? contentObjects.map((obj: TextType | PictureType) => {
                    if (obj.type === 'text') {
                        return (
                            <Text
                                key={obj.id}
                                scale={scale}
                                parentRef={parentRef}
                                text={obj}
                            />
                        )
                    } else if (obj.type === 'picture') {
                        return (
                            <Picture
                                key={obj.id}
                                scale={scale}
                                pictureObj={obj}
                            />
                        )
                    }
                    return null

                })
                : null
            }
        </div>
    )
}

export { Slide }
