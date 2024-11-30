import { ChevronDown24px } from '../../assets/ChevronDown24px'
import { Logo } from '../../assets/Logo'
import { Button } from '../../components/Button/Button'
import { EditorType } from '../../store/types'
import { Name } from './Name/Name'
import { Toolbar } from './Toolbar/Toolbar'
import styles from './TopPanel.module.css'

type TopPanelProps = {
	editor: EditorType
}

function TopPanel({ editor }: TopPanelProps) {
    return (
        <div className={styles.topPanel}>
            {Logo}
            <Name text={editor.presentation.name} />
            <Toolbar editor={editor} />
            <Button
                type="text-icon"
                text={'Export'}
                icon={ChevronDown24px}
                onClick={() => {}}
                onIconClick={() => {}}
            />
        </div>
    )
}

export { TopPanel }
