import {type TypedUseSelectorHook, useSelector} from 'react-redux'
import {type editorReducer} from '../../store/redux/editorReducer'

// Выведение типа `RootState` из хранилища
type RootState = ReturnType<typeof editorReducer>

// Используйте во всем приложении вместо `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {useAppSelector}
