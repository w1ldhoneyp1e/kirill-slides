import { saveToLocalStorage } from '../../../store/localStorage/saveToLocalStorage'
import { validateDocument } from '../../../store/localStorage/validateEditor'
import { setEditor } from '../../../store/redux/editorActionCreators'
import { EditorType } from '../../../store/types'

const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'

    input.onchange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const importedEditor: EditorType = JSON.parse(e.target!.result as string)

                    // Валидируем импортированные данные
                    const isValid = validateDocument(importedEditor)
                    if (!isValid) {
                        alert('Ошибка: данные не прошли валидацию.')
                        return
                    }

                    saveToLocalStorage(importedEditor)
                    setEditor(importedEditor)
                    alert('Импорт завершен успешно.')
                } catch (error) {
                    alert('Ошибка при импорте данных.')
                    console.error(error)
                }
            }
            reader.readAsText(file)
        }
    }

    input.click()
}

export { handleImport }
