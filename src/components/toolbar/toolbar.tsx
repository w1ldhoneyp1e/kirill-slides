import { ToolbarButton } from "../toolbarButton/toolbarButton"
import { ToolbarSelect } from "../toolbarSelect/toolbarSelect"
import { Button } from "../../types"
import styles from "./toolbar.module.css"

type ToolbarProps = {
    buttons: Button[],
    id: string
}



function Toolbar(props:ToolbarProps) {
    return (
        <div key={props.id} className={styles.bar}>
            {props.buttons.map((button) => {
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