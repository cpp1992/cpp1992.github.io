import { MD_MAKE } from '../actions/md';

export const defaultState = {
	mdfiles: '',
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case MD_MAKE:
			return Object.assign({}, state, {
				mdfiles: action.mdfiles,
			});
	}
	return state;
};
