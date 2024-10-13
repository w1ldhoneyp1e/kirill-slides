import { getUID } from "../../store/methods";
import { PresentationType } from "../../store/types";
import { Name } from "../Name/Name";
import { Toolbar } from "../Toolbar/Toolbar";
import styles from "./upperContainer.module.css"

type UpperContainerProps = {
    presentation: PresentationType
}

function UpperContainer(props:UpperContainerProps) {
    return (
        <div className={styles.container}>
            <Name 
                text={props.presentation.name}
            />
            <Toolbar
                id={getUID()}
            />
        </div>
    )
}

export {UpperContainer};