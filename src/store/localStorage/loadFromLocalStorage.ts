import { EditorType } from '../types'

const LOCAL_STORAGE_KEY = 'editor'

const loadFromLocalStorage = (): EditorType | undefined => {
    try {
        const serializedValue = localStorage.getItem(LOCAL_STORAGE_KEY)
        return serializedValue ? JSON.parse(serializedValue) as EditorType : undefined
    } catch (error) {
        console.error('Ошибка при загрузке из localStorage:', error)
        return undefined
    }
}

export {loadFromLocalStorage}
