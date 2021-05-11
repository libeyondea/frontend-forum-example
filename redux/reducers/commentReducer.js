import {
	CREATE_COMMENT_FAILED,
	CREATE_COMMENT_REQUESTED,
	CREATE_COMMENT_SUCCEED,
	DELETE_COMMENT_FAILED,
	DELETE_COMMENT_REQUESTED,
	DELETE_COMMENT_SUCCEED,
	LIST_COMMENT_FAILED,
	LIST_COMMENT_REQUESTED,
	LIST_COMMENT_SUCCEED
} from '@/redux/constants';

const initialState = {
	list_comment: {
		comments: [],
		comments_count: 0,
		is_loading: true,
		errors: {}
	},
	create_comment: {
		comment: {},
		is_loading: false,
		errors: {}
	},
	delete_comment: {
		comment: {},
		is_loading: false,
		errors: {}
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
		//
		case DELETE_COMMENT_REQUESTED:
			return {
				...state,
				delete_comment: {
					...state.delete_comment,
					is_loading: true
				}
			};
		case DELETE_COMMENT_SUCCEED:
			return {
				...state,
				list_comment: {
					...state.list_comment,
					comments: state.list_comment.comments.filter((i) => i.id !== action.payload.comment.id),
					comments_count: state.list_comment.comments_count - 1
				},
				delete_comment: {
					...state.delete_comment,
					comment: action.payload.comment,
					is_loading: false
				}
			};
		case DELETE_COMMENT_FAILED:
			return {
				...state,
				delete_comment: {
					...state.delete_comment,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default commentReducer;
