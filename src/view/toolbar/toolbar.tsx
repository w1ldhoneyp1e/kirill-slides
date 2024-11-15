import { ToolbarButton } from '../../components/ToolbarButton/ToolbarButton.tsx'
import { dispatch } from '../../store/editor.ts'
import {
    addPicture,
    addSlide,
    addText,
    changeSlideBackground,
    deleteObjects,
    deleteSlide,
    getUID,
} from '../../store/methods.ts'
import { EditorType } from '../../store/types.ts'

import styles from './toolbar.module.css'

type ToolbarProps = {
	editor: EditorType
}

function Toolbar({ editor }: ToolbarProps) {
    const thisSlide = editor.presentation.slides.find((slide) => slide.id === editor.selection.selectedSlideId)!
    const background = thisSlide ? thisSlide.background : null
    const value =
		background?.type === 'solid' ? background?.hexColor : background?.src
    return (
        <div className={styles.bar}>
            <ToolbarButton
                text={'Создать слайд'}
                onClick={() => dispatch(addSlide)}
                key={getUID()}
            />
            <ToolbarButton
                isDisabled={!editor.selection.selectedSlideId}
                text={'Удалить слайд'}
                onClick={() => dispatch(deleteSlide)}
                key={getUID()}
            />
            <ToolbarButton
                isDisabled={!editor.selection.selectedSlideId}
                text={'Создать текст'}
                onClick={() => dispatch(addText)}
                key={getUID()}
            />
            <ToolbarButton
                isDisabled={!editor.selection.selectedSlideId}
                text={'Создать картинку'}
                onClick={() => dispatch(addPicture)}
                key={getUID()}
            />
            <ToolbarButton
                isDisabled={editor.selection.selectedObjIds.length === 0}
                text={'Удалить'}
                onClick={() => dispatch(deleteObjects)}
                key={getUID()}
            />
            <input
                type="color"
                value={value ?? '#FFFFFF'}
                onChange={(e) =>
                    dispatch(changeSlideBackground, {
                        value: e.target.value,
                        type: 'solid',
                    })
                }
                className={styles.colorpicker}
            />
        </div>
    )
}
export { Toolbar }
