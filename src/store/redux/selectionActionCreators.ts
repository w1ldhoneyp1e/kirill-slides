import {
	type DeselectAction,
	type SetSelectionAction,
	ACTION_TYPE,
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
		type: ACTION_TYPE.setSelection,
		payload: {
			type,
			id,
		},
	}
}

function deselect({type}: {type: 'slide' | 'object'}): DeselectAction {
	return {
		type: ACTION_TYPE.deselect,
		payload: {type},
	}
}

export {
	setSelection, deselect,
}
