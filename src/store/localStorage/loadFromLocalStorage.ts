import {defaultEditor} from '../data'
import {type EditorType} from '../types'

const LOCAL_STORAGE_KEY = 'editor'

const loadFromLocalStorage = (): EditorType => {
	try {
		const serializedValue = localStorage.getItem(LOCAL_STORAGE_KEY)
		return serializedValue
			? JSON.parse(serializedValue) as EditorType
			: defaultEditor
	}
	catch (error) {
		console.error('Ошибка при загрузке из localStorage:', error)
		return defaultEditor
	}
}

export {loadFromLocalStorage}
