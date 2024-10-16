import styles from "./toolbar.module.css"
import { buttons } from "./buttons.ts"
import { ToolbarButton } from "../../components/ToolbarButton/ToolbarButton.tsx"
import { ToolbarSelect } from "../../components/ToolbarSelect/ToolbarSelect.tsx"
import { dispatch } from "../../store/editor.ts"
import { changeSlideBackground } from "../../store/methods.ts"
import { EditorType } from "../../store/types.ts"
type ToolbarProps = {
    editor: EditorType
}



function Toolbar({editor}:ToolbarProps) {
    const thisSlide = editor.presentation.slides.find(slide => slide.id === editor.selection.selectedSlideId)!
    const background = (thisSlide) ? thisSlide.background : null
    const value = background?.type === 'solid' ? background?.hexColor : background?.src 
    return (
        <div className={styles.bar}>
            {buttons.map((button) => {
                if (button.type === 'button') {
                    return (
                        <ToolbarButton 
                            text={button.text} 
                            onClick={button.onClick}
                            key={button.id}
                        />
                    )
                }
                if (button.type === 'select') {
                    return (
                        <ToolbarSelect
                            text={button.text}
                            options={button.options}
                            key={button.id}
                        />
                    )
                }
            })}
            <input 
                type="color" 
                value={value ?? '#FFFFFF'}
                onChange={(e) => dispatch(changeSlideBackground, {value: e.target.value, type:"solid"})}
                className={styles.colorpicker}
            />
        </div>
        
    )
}
export {Toolbar};