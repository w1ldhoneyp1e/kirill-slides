import { AddPicture24px } from '../../../assets/AddPicture24px.tsx'
import { AddText24px } from '../../../assets/AddText24px.tsx'
import { Cursor24px } from '../../../assets/Cursor24px.tsx'
import { Plus24px } from '../../../assets/Plus24px.tsx'
import { Redo24px } from '../../../assets/Redo24px.tsx'
import { Undo24px } from '../../../assets/Undo24px.tsx'
import {ButtonProps} from '../../../components/Button/Button.tsx'
import { ButtonGroup } from '../../../components/ButtonGroup/ButtonGroup.tsx'
import { Divider } from '../../../components/Divider/Divider.tsx'
import { useAppActions } from '../../hooks/useAppActions.ts'
import { useAppSelector } from '../../hooks/useAppSelector.ts'

import styles from './Toolbar.module.css'

function Toolbar() {
    const slides = useAppSelector((editor => editor.presentation.slides))
    const selectedSlideId = useAppSelector((editor => editor.selection.selectedSlideId))
    const {
        addSlide, addText, addPicture,
    } = useAppActions()
    const thisSlide = slides.find((slide) => slide.id === selectedSlideId)!
    const background = thisSlide ? thisSlide.background : null
    const value =
		background?.type === 'solid' ? background?.hexColor : background?.src

    const addButton: ButtonProps = {
        type: 'icon',
        icon: Plus24px,
        onClick: addSlide,
    }

    const undoRedoButton: ButtonProps = {
        type: 'icon-icon',
        iconFirst: Undo24px,
        iconSecond: Redo24px,
        onClick: () => {},
        onIconClick: () => {},
    }

    const cursorButton: ButtonProps = {
        type: 'icon',
        icon: Cursor24px,
        onClick: () => {},
    }

    const addTextButton: ButtonProps = {
        type: 'icon',
        icon: AddText24px,
        onClick: addText,
    }

    const addImageButton: ButtonProps = {
        type: 'icon',
        icon: AddPicture24px,
        onClick: addPicture,
    }

    const backgroundButton: ButtonProps = {
        type: 'text',
        text: 'Background',
        onClick: () => {},
    }
    return (
        <div className={styles.toolBar}>
            <ButtonGroup
                items={[addButton]}
            />
            <Divider
                type="vertical"
                size="half"
            />
            <ButtonGroup
                items={[undoRedoButton]}
            />
            <Divider
                type="vertical"
                size="half"
            />
            <ButtonGroup
                items={[cursorButton, addTextButton, addImageButton]}
            />
            <Divider
                type="vertical"
                size="half"
            />
            <ButtonGroup
                items={[backgroundButton]}
            />
        </div>
        // <div className={styles.bar}>
        //     <ToolbarButton
        //         text={'Создать слайд'}
        //         onClick={() => dispatch(addSlide)}
        //         key={getUID()}
        //     />
        //     <ToolbarButton
        //         isDisabled={!editor.selection.selectedSlideId}
        //         text={'Удалить слайд'}
        //         onClick={() => dispatch(deleteSlide)}
        //         key={getUID()}
        //     />
        //     <ToolbarButton
        //         isDisabled={!editor.selection.selectedSlideId}
        //         text={'Создать текст'}
        //         onClick={() => dispatch(addText)}
        //         key={getUID()}
        //     />
        //     <ToolbarButton
        //         isDisabled={!editor.selection.selectedSlideId}
        //         text={'Создать картинку'}
        //         onClick={() => dispatch(addText)}
        //         key={getUID()}
        //     />
        //     <ToolbarButton
        //         isDisabled={editor.selection.selectedObjIds.length === 0}
        //         text={'Удалить'}
        //         onClick={() => dispatch(deleteObjects)}
        //         key={getUID()}
        //     />
        //     <input
        //         type="color"
        //         value={value ?? '#FFFFFF'}
        //         onChange={(e) =>
        //             dispatch(changeSlideBackground, {
        //                 value: e.target.value,
        //                 type: 'solid',
        //             })
        //         }
        //         className={styles.colorpicker}
        //     />
        // </div>
    )
}
export { Toolbar }
