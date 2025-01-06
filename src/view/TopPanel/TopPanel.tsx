import {useMemo} from 'react'
import {Download24px} from '../../assets/Download24px'
import {Logo} from '../../assets/Logo'
import {PDF24px} from '../../assets/PDF24px'
import {Upload24px} from '../../assets/Upload24px'
import {type SelectButtonOption, SelectButton} from '../../components/SelectButton/SelectButton'
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

	const options: SelectButtonOption[] = useMemo(() => [
		{
			icon: PDF24px,
			text: 'Экспорт в PDF',
			onClick: () => exportToPDF(presentation),
		},
		{
			icon: Download24px,
			text: 'Экспорт в JSON',
			onClick: () => handleExport(),
		},
		{
			icon: Upload24px,
			text: 'Импорт в JSON',
			onClick: () => handleImport(),
		},
	], [handleExport, handleImport, presentation])

	return (
		<div className={styles.topPanel}>
			{Logo}
			<Name />
			<Toolbar />
			<SelectButton
				options={options}
				defaultOptionIndex={0}
			/>

		</div>
	)
}

export {TopPanel}
