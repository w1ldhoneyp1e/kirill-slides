import { validateDocument } from './validateEditor'
import {
    EditorType, PresentationType,
} from '../../../store/types'
import { useAppActions } from '../../hooks/useAppActions'

const useHandleImport = () => {
    const {setEditor} = useAppActions()
    return () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'application/json'
        input.onchange = (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    try {
                        const importedPresentation: PresentationType = JSON.parse(e.target!.result as string)

                        const isValid = validateDocument(importedPresentation)
                        if (!isValid) {
                            alert('Ошибка: данные не прошли валидацию.')
                            return
                        }

                        const editor: EditorType = {
                            presentation: importedPresentation,
                            selection: {
                                selectedObjIds: [],
                                selectedSlideId: '',
                            },
                        }

                        setEditor(editor)

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
        input.remove()
    }
}

export { useHandleImport }
