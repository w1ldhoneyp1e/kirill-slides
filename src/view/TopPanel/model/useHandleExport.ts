import {useAppSelector} from '../../hooks/useAppSelector'

const useHandleExport = () => {
	const editor = useAppSelector(editor => editor)
	return () => {
		const jsonEditor = JSON.stringify(editor.presentation)
		const blob = new Blob([jsonEditor], {type: 'application/json'})
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'editor.json'
		a.click()
		a.remove()
		URL.revokeObjectURL(url)
	}
}

export {useHandleExport}
