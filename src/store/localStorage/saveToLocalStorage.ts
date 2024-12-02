import { Middleware } from 'redux'

const LOCAL_STORAGE_KEY = 'editor'

const saveToLocalStorage: Middleware = store => next => action => {
    const result = next(action)

    const stateToSave = store.getState()
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave))

    return result
}

export {saveToLocalStorage}
