import { Map } from 'immutable';
import { ActionTypes } from 'Actions/actions';

export const thunkErrorStore = (
	state = new Map({ byCategory: new Map() }),
	action,
) => {
	switch (action.type) {
		case ActionTypes.SET_THUNK_ERROR: {
			const { errorCategory, error } = action;
			return state.setIn(['byCategory', errorCategory], error);
		}
		case ActionTypes.CLEAR_THUNK_ERROR: {
			const { errorCategory } = action;
			return state.setIn(['byCategory', errorCategory], null);
		}
		default:
			return state;
	}
};
