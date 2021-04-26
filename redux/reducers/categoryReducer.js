import {
	LIST_CATEGORY_REQUESTED,
	LIST_CATEGORY_SUCCEED,
	LIST_CATEGORY_FAILED,
	SINGLE_CATEGORY_REQUESTED,
	SINGLE_CATEGORY_SUCCEED,
	SINGLE_CATEGORY_FAILED
} from '../constants';

const initialState = {
	list_category: {
		categories: [],
		is_loading: true,
		errors: null
	},
	single_category: {
		category: {},
		is_loading: true,
		errors: null
	}
};
const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_CATEGORY_REQUESTED:
			return {
				...state,
				list_category: {
					...state.list_category,
					is_loading: true
				}
			};
		case LIST_CATEGORY_SUCCEED:
			return {
				...state,
				list_category: {
					...state.list_category,
					categories: action.payload.categories,
					is_loading: false
				}
			};
		case LIST_CATEGORY_FAILED:
			return {
				...state,
				list_category: {
					...state.list_category,
					errors: action.payload.errors
				}
			};
		//
		case SINGLE_CATEGORY_REQUESTED:
			return {
				...state,
				single_category: {
					...state.single_category,
					category: {},
					is_loading: true
				}
			};
		case SINGLE_CATEGORY_SUCCEED:
			return {
				...state,
				single_category: {
					...state.single_category,
					category: action.payload.category,
					is_loading: false
				}
			};
		case SINGLE_CATEGORY_FAILED:
			return {
				...state,
				single_category: {
					...state.single_category,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default categoryReducer;
