import { saveToLocalStorage } from '../../../store/localStorage/methods'
import { setEditor } from '../../../store/editor'
import { EditorType } from '../../../store/types'

const handleImport = () => {
    // Создаем input[type="file"] программно
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'

    // Обрабатываем выбор файла
    input.onchange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const importedEditor = JSON.parse(e.target!.result as string) as EditorType
                    saveToLocalStorage(importedEditor) // Сохраняем в localStorage
                    setEditor(importedEditor) // Обновляем глобальное состояние
                    alert('Импорт завершен успешно.')
                } catch (error) {
                    alert('Ошибка при импорте данных.')
                    console.error(error)
                }
            }
            reader.readAsText(file)
        }
    }

    // Программно кликаем по input, чтобы открыть диалог выбора файла
    input.click()
}

export {handleImport}
