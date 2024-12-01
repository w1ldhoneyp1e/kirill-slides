import { EditorType } from '../../../store/types'

const handleExport = (editor: EditorType) => {
    const jsonEditor = JSON.stringify(editor)
    const blob = new Blob([jsonEditor], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'editor.json'
    a.click()
    URL.revokeObjectURL(url)
}

export {handleExport}
