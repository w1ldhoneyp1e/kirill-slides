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

const loadFromLocalStorage = (): EditorType | undefined => {
    try {
        const serializedValue = localStorage.getItem(LOCAL_STORAGE_KEY)
        return serializedValue ? JSON.parse(serializedValue) as EditorType : undefined
    } catch (error) {
        console.error('Ошибка при загрузке из localStorage:', error)
        return undefined
    }
}

export {
    saveToLocalStorage,
    loadFromLocalStorage,
}
