import {
    CSSProperties, useCallback, useRef,
} from 'react'
import {
    BackgroundType,
    PictureType,
    SizeType,
    TextType,
} from '../../store/types'
import { Text } from '../Text/Text'
import { Picture } from '../Picture/Picture'

import styles from './Slide.module.css'
import { useAppSelector } from '../../view/hooks/useAppSelector'
import { useAppActions } from '../../view/hooks/useAppActions'

type SlideProps = {
	slideId: string
	scale?: number
}

function Slide({
    slideId,
    scale = 1,
}: SlideProps) {
    const parentRef = useRef<HTMLDivElement>(null)

    const contentObjects = useAppSelector(editor => editor.presentation.slides.find(s => s.id === slideId)?.contentObjects)
    const slide = useAppSelector(editor => editor.presentation.slides.find(s => s.id === slideId))
    const {changeObjectSize} = useAppActions()

    function setBackground(background: BackgroundType): string {
        let value: string = ''
        if (background.type === 'solid') value = background.hexColor
        if (background.type === 'image') value = `url(${background.src})`
        return value
    }

    const style: CSSProperties = slide
        ? {background: setBackground(slide.background)}
        : {}

    const onResize = useCallback((objId: string, size: SizeType) => {
        changeObjectSize({
            slideId: slide?.id ?? '',
            objId:objId,
            size:size,
        })
    }, [changeObjectSize, slide?.id])

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
                                onResize={onResize}
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
