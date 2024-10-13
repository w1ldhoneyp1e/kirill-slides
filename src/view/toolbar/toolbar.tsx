import { ToolbarButton } from "../../components/toolbarButton/toolbarButton"
import { ToolbarSelect } from "../../components/toolbarSelect/toolbarSelect"
import styles from "./toolbar.module.css"
import { buttons } from "./buttons.ts";
type ToolbarProps = {
    id: string
}



function Toolbar(props:ToolbarProps) {
    return (
        <div key={props.id} className={styles.bar}>
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
                    return (<ToolbarSelect
                    text={button.text}
                    options={button.options}
                    key={button.id}
                    />)
                }
            }
            )}
        </div>
        
    )
}
export {Toolbar};