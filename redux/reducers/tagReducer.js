import {
	LIST_TAG_FAILED,
	LIST_TAG_REQUESTED,
	LIST_TAG_SUCCEED,
	SINGLE_TAG_FAILED,
	SINGLE_TAG_REQUESTED,
	SINGLE_TAG_SUCCEED
} from '@/redux/constants';

const initialState = {
	list_tag: {
		tags: [],
		is_loading: true,
		errors: null
	},
	single_tag: {
		tag: {},
		is_loading: true,
		errors: null
	}
};
const tagReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_TAG_REQUESTED:
			return {
				...state,
				list_tag: {
					...state.list_tag,
					is_loading: true
				}
			};
		case LIST_TAG_SUCCEED:
			return {
				...state,
				list_tag: {
					...state.list_tag,
					tags: action.payload.tags,
					is_loading: false
				}
			};
		case LIST_TAG_FAILED:
			return {
				...state,
				list_tag: {
					...state.list_tag,
					errors: action.payload.errors
				}
			};
		//
		case SINGLE_TAG_REQUESTED:
			return {
				...state,
				single_tag: {
					...state.single_tag,
					tag: {},
					is_loading: true
				}
			};
		case SINGLE_TAG_SUCCEED:
			return {
				...state,
				single_tag: {
					...state.single_tag,
					tag: action.payload.tag,
					is_loading: false
				}
			};
		case SINGLE_TAG_FAILED:
			return {
				...state,
				single_tag: {
					...state.single_tag,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default tagReducer;
