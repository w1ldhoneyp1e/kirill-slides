import { ActionType } from './actions'

function addText() {
    return {type: ActionType.ADD_TEXT}
}

function addPicture() {
    return {type: ActionType.ADD_PICTURE}
}

function changeObjectPosition({
    id,
    position,
}: {
    id: string,
    position: {
        x: number,
        y: number,
    }
}) {
    return {
        type: ActionType.CHANGE_OBJECT_POSITION,
        payload: {
            id: id,
            position: {
                x: position.x,
                y: position.y,
            },
        },
    }
}

export {
    addText,
    addPicture,
    changeObjectPosition,
}
