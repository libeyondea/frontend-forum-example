import {
	CREATE_COMMENT_FAILED,
	CREATE_COMMENT_REQUESTED,
	CREATE_COMMENT_SUCCEED,
	LIST_COMMENT_FAILED,
	LIST_COMMENT_REQUESTED,
	LIST_COMMENT_SUCCEED
} from '@/redux/constants';

const initialState = {
	list_comment: {
		comments: [],
		comments_count: 0,
		is_loading: true,
		errors: null
	},
	create_comment: {
		comment: {},
		is_loading: false,
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
		//
		case CREATE_COMMENT_REQUESTED:
			return {
				...state,
				create_comment: {
					...state.create_comment,
					is_loading: true
				}
			};
		case CREATE_COMMENT_SUCCEED:
			return {
				...state,
				list_comment: {
					...state.list_comment,
					comments: [action.payload.comment].concat(state.list_comment.comments),
					comments_count: state.list_comment.comments_count + 1
				},
				create_comment: {
					...state.create_comment,
					comment: action.payload.comment,
					is_loading: false
				}
			};
		case CREATE_COMMENT_FAILED:
			return {
				...state,
				create_comment: {
					...state.create_comment,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default commentReducer;
