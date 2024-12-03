import { store } from '../../../store/redux/store'

const handleExport = () => {
    const editor = store.getState()
    const jsonEditor = JSON.stringify(editor.presentation)
    const blob = new Blob([jsonEditor], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'editor.json'
    a.click()
    URL.revokeObjectURL(url)
}

export {handleExport}
