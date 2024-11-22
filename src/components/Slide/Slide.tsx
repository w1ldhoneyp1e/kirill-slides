import {
    CSSProperties, useCallback, useRef,
} from 'react'
import {
    BackgroundType,
    EditorType,
    PictureType,
    SizeType,
    SlideType,
    TextType,
} from '../../store/types'
import { Text } from '../Text/Text'
import { Picture } from '../Picture/Picture'

import styles from './Slide.module.css'
import { dispatch } from '../../store/editor'
import { changeObjectSize } from '../../store/methods'

type SlideProps = {
	editor: EditorType
	slide: SlideType
	isSelected?: boolean
	scale?: number
}

function Slide({
    slide,
    isSelected,
    editor,
    scale = 1,
}: SlideProps) {
    const parentRef = useRef<HTMLDivElement>(null)

    function setBackground(background: BackgroundType): string {
        let value: string = ''
        if (background.type === 'solid') value = background.hexColor
        if (background.type === 'image') value = `url(${background.src})`
        return value
    }

    const style: CSSProperties = {background: setBackground(slide.background)}

    if (isSelected) {
        style.border = '3px solid #0b57d0'
    }

    const onResize = useCallback((objId: string, size: SizeType) => {
        dispatch(changeObjectSize, {
            slideId: slide.id,
            objId,
            size,
        })
    }, [slide.id])

    return (
        <div className={styles.slide} style={style} ref={parentRef}>
            {slide.id}
            {slide.contentObjects.map((obj: TextType | PictureType) => {
                if (obj.type === 'text') {
                    return (
                        <Text
                            key={obj.id}
                            scale={scale}
                            parentRef={parentRef}
                            text={obj}
                            onResize={onResize}
                            isSelected={!!editor.selection.selectedObjIds.includes(obj.id)}
                        />
                    )
                } else if (obj.type === 'picture') {
                    return (
                        <Picture
                            key={obj.id}
                            scale={scale}
                            pictureObj={obj}
                            isSelected={!!editor.selection.selectedObjIds.includes(obj.id)}
                        />
                    )
                }
                return null

            })}
        </div>
    )
}

export { Slide }
