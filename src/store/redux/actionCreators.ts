import * as EditorActionCreators from './editorActionCreators'
import * as ObjectActionCreators from './objectActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as SlideActionCreators from './slideActionCreators'

export default {
	...SlideActionCreators,
	...SelectionActionCreators,
	...EditorActionCreators,
	...ObjectActionCreators,
}
