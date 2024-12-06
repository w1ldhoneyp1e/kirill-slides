import { Logo } from '../../assets/Logo'
import { Button } from '../../components/Button/Button'
import { useHandleExport } from './model/useHandleExport'
import { useHandleImport } from './model/useHandleImport'
import { Name } from './Name/Name'
import { Toolbar } from './Toolbar/Toolbar'
import styles from './TopPanel.module.css'

function TopPanel() {
    const handleExport = useHandleExport()
    const handleImport = useHandleImport()
    return (
        <div className={styles.topPanel}>
            {Logo}
            <Name />
            <Toolbar />
            <Button
                type="text"
                text={'Export'}
                onClick={() => handleExport()}
            />
            <Button
                type="text"
                text={'Import'}
                onClick={() => handleImport()}
            />
        </div>
    )
}

export { TopPanel }
