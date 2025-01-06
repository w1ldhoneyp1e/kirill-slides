import {type TypedUseSelectorHook, useSelector} from 'react-redux'
import {type editorReducer} from '../../store/redux/editorReducer'

type RootState = ReturnType<typeof editorReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {useAppSelector}
