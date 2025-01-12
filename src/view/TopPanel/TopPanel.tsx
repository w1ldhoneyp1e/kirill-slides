import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {Download24px} from '../../assets/icons/Download24px'
import {Logo} from '../../assets/icons/Logo'
import {PDF24px} from '../../assets/icons/PDF24px'
import {Play24px} from '../../assets/icons/Play24px'
import {Upload24px} from '../../assets/icons/Upload24px'
import {Button} from '../../components/Button/Button'
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

	const goTo = useNavigate()

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
			<Button
				type="icon-text"
				icon={Play24px}
				state="default"
				text="Воспроизвести"
				onClick={() => goTo('/player')}
			/>
		</div>
	)
}

export {TopPanel}
