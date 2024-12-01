import { Logo } from '../../assets/Logo'
import { Button } from '../../components/Button/Button'
import { EditorType } from '../../store/types'
import { handleExport } from './model/handleExport'
import { handleImport } from './model/handleImport'
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
                type="text"
                text={'Export'}
                onClick={() => handleExport(editor)}
            />
            <Button
                type="text"
                text={'Import'}
                onClick={handleImport}
            />
        </div>
    )
}

export { TopPanel }
