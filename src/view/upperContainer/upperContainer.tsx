import { getUID } from "../../store/methods";
import { Presentation } from "../../store/types";
import { Name } from "../name/name";
import { Toolbar } from "../toolbar/toolbar";
import styles from "./upperContainer.module.css"

type UpperContainerProps = {
    presentation: Presentation
}

function UpperContainer(props:UpperContainerProps) {
    return (
        <div className={styles.container}>
            <Name 
                text={props.presentation.name}
                key={getUID()}
            />
            <Toolbar
                id={getUID()}
            />
        </div>
    )
}

export {UpperContainer};