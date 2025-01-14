import {defaultEditor} from '../data'
import {
	addPicture,
	addSlide,
	addText,
	changeObjectPosition,
	changeObjectSize,
	changePresentationName,
	changeTextColor,
	changeTextFontSize,
	changeTextValue,
	deleteSlide,
	deselect,
	setSelection,
	setSlideIndex,
} from '../methods'
import {type EditorType} from '../types'
import {type EditorAction, ACTION_TYPE} from './actions'

// eslint-disable-next-line @typescript-eslint/default-param-last
function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
	switch (action.type) {
		case ACTION_TYPE.addSlide:
			return addSlide(editor)
		case ACTION_TYPE.removeSlide:
			return deleteSlide(editor)
		case ACTION_TYPE.setSlideIndex:
			return setSlideIndex(editor, action)
		case ACTION_TYPE.setSelection:
			return setSelection(editor, action)
		case ACTION_TYPE.setEditor:
			return action.payload
		case ACTION_TYPE.deselect:
			return deselect(editor, action)
		case ACTION_TYPE.addText:
			return addText(editor)
		case ACTION_TYPE.addPicture:
			return addPicture(editor, action)
		case ACTION_TYPE.changeName:
			return changePresentationName(editor, action)
		case ACTION_TYPE.changeObjectPosition:
			return changeObjectPosition(editor, action)
		case ACTION_TYPE.changeObjectSize:
			return changeObjectSize(editor, action)
		case ACTION_TYPE.changeTextValue:
			return changeTextValue(editor, action)
		case ACTION_TYPE.changeTextFontSize:
			return changeTextFontSize(editor, action)
		case ACTION_TYPE.changeTextFontColor:
			return changeTextColor(editor, action)
		default:
			return editor
	}
}

export {editorReducer}
