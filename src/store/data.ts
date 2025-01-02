import {getDefaultBackground, getUID} from './methods'
import {
	type EditorType,
	type PresentationType,
	type SlideType,
} from './types'

const slides: SlideType[] = [
	{
		id: getUID(),
		contentObjects: [],
		background: getDefaultBackground(),
		position: null,
	},
	{
		id: getUID(),
		contentObjects: [],
		background: getDefaultBackground(),
		position: null,
	},
	{
		id: getUID(),
		contentObjects: [],
		background: getDefaultBackground(),
		position: null,
	},
]

const presentation: PresentationType = {
	id: getUID(),
	name: 'Новая презентация',
	slides,
}

const defaultEditor: EditorType = {
	presentation,
	selection: {
		selectedSlideId: '',
		selectedObjIds: [],
	},
}

export {defaultEditor}
