import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as EditorActionCreators from './editorActionCreators'
import * as ObjectActionCreators from './objectActionCreators'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...EditorActionCreators,
    ...ObjectActionCreators,
}
