import {Logo} from '../../assets/Logo'
import {Button} from '../../components/Button/Button'
import {exportToPDF} from '../../utils/exportToPDF'
import {useAppSelector} from '../hooks/useAppSelector'
import {useHandleExport} from './model/useHandleExport'
import {useHandleImport} from './model/useHandleImport'
import {Name} from './Name/Name'
import {Toolbar} from './Toolbar/Toolbar'
import styles from './TopPanel.module.css'

function TopPanel() {
	const presentation = useAppSelector(editor => editor.presentation)
	const handleExport = useHandleExport()
	const handleImport = useHandleImport()
	return (
		<div className={styles.topPanel}>
			{Logo}
			<Name />
			<Toolbar />
			<Button
				type="text"
				text="Export"
				onClick={() => handleExport()}
			/>
			<Button
				type="text"
				text="Import"
				onClick={() => handleImport()}
			/>
			<Button
				type="text"
				text="Export to PDF"
				onClick={() => exportToPDF(presentation)}
			/>
		</div>
	)
}

export {TopPanel}
