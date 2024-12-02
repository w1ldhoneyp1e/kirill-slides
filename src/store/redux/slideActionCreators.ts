import { ActionType } from './actions'

function addSlide() {
    return {type: ActionType.ADD_SLIDE}
}

function removeSlide() {
    return {type: ActionType.REMOVE_SLIDE}
}

function setSlideIndex(payload: {id: string, index: number}) {
    return {
        type: ActionType.SET_SLIDE_INDEX,
        payload: payload,
    }
}

export {
    addSlide,
    removeSlide,
    setSlideIndex,
}
