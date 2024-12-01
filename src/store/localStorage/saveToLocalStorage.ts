import { EditorType } from '../types'

const LOCAL_STORAGE_KEY = 'editor'

const saveToLocalStorage = (value: EditorType): void => {
    try {
        const serializedValue = JSON.stringify(value)
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedValue)
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error)
    }
}

export {saveToLocalStorage}
