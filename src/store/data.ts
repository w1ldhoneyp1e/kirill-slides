import {
    getUID, getDefaultBackground,
} from './methods'
import {
    SlideType, PresentationType, EditorType,
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
    slides: slides,
}

const defaultEditor: EditorType = {
    presentation: presentation,
    selection: {
        selectedSlideId: '',
        selectedObjIds: [],
    },
}

export {defaultEditor}
