import { Logo } from '../../assets/Logo'
import { Button } from '../../components/Button/Button'
import { handleExport } from './model/handleExport'
import { handleImport } from './model/handleImport'
import { Name } from './Name/Name'
import { Toolbar } from './Toolbar/Toolbar'
import styles from './TopPanel.module.css'
import { useAppSelector } from '../hooks/useAppSelector'

function TopPanel() {
    const editor = useAppSelector((editor => editor))
    return (
        <div className={styles.topPanel}>
            {Logo}
            <Name />
            <Toolbar />
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
