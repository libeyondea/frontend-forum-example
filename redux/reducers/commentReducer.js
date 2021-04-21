import { LIST_COMMENT_REQUESTED, LIST_COMMENT_SUCCEED, LIST_COMMENT_FAILED } from '../constants';

const initialState = {
	list_comment: {
		comments: [],
		comments_count: 0,
		is_loading: true,
		errors: null
	}
};

const commentReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_COMMENT_REQUESTED:
			return {
				...state,
				list_comment: {
					...state.list_comment,
					is_loading: true
				}
			};
		case LIST_COMMENT_SUCCEED:
			return {
				...state,
				list_comment: {
					...state.list_comment,
					comments: action.payload.comments,
					comments_count: action.payload.comments_count,
					is_loading: false
				}
			};
		case LIST_COMMENT_FAILED:
			return {
				...state,
				list_comment: {
					...state.list_comment,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default commentReducer;
