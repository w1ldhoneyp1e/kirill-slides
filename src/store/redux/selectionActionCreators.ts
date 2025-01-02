import {
	type DeselectAction,
	type SetSelectionAction,
	ActionType,
} from './actions'

type SelectionProps = {
	type: 'slide' | 'object',
	id: string,
}

function setSelection({
	type,
	id,
}: SelectionProps): SetSelectionAction {
	return {
		type: ActionType.SET_SELECTION,
		payload: {
			type,
			id,
		},
	}
}

function deselect({type}: {type: 'slide' | 'object'}): DeselectAction {
	return {
		type: ActionType.DESELECT,
		payload: {type},
	}
}

export {
	setSelection, deselect,
}
