import { getUID } from "../../methods";
import { Button } from "../../types";
import { Name } from "../name/name";
import { Toolbar } from "../toolbar/toolbar";
import styles from "./upperContainer.module.css"

type UpperContainerProps = {
    toolbar: Button[]
}

function UpperContainer(props:UpperContainerProps) {
    return (
        <div className={styles.container}>
            <Name 
                text={'My New Presentation'}
                key={getUID()}
            />
            <Toolbar
                id={getUID()}
                buttons={props.toolbar}
            />
        </div>
    )
}

export {UpperContainer};