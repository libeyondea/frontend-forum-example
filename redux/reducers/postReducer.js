import {
	LIST_POST_CATEGORY_FAILED,
	LIST_POST_CATEGORY_REQUESTED,
	LIST_POST_CATEGORY_SUCCEED,
	LIST_POST_FAILED,
	LIST_POST_REQUESTED,
	LIST_POST_SUCCEED,
	LIST_POST_TAG_FAILED,
	LIST_POST_TAG_REQUESTED,
	LIST_POST_TAG_SUCCEED,
	SINGLE_POST_FAILED,
	SINGLE_POST_REQUESTED,
	SINGLE_POST_SUCCEED
} from '@/redux/constants';

const initialState = {
	list_post: {
		posts: [],
		posts_count: 0,
		is_loading: true,
		errors: null
	},
	list_post_tag: {
		posts: [],
		posts_count: 0,
		is_loading: true,
		errors: null
	},
	list_post_category: {
		posts: [],
		posts_count: 0,
		is_loading: true,
		errors: null
	},
	single_post: {
		post: {},
		is_loading: true,
		errors: null
	}
};
const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_POST_REQUESTED:
			return {
				...state,
				list_post: {
					...state.list_post,
					is_loading: true
				}
			};
		case LIST_POST_SUCCEED:
			return {
				...state,
				list_post: {
					...state.list_post,
					posts: action.payload.posts,
					posts_count: action.payload.posts_count,
					is_loading: false
				}
			};
		case LIST_POST_FAILED:
			return {
				...state,
				list_post: {
					...state.list_post,
					errors: action.payload.errors
				}
			};
		//
		case LIST_POST_TAG_REQUESTED:
			return {
				...state,
				list_post_tag: {
					...state.list_post_tag,
					is_loading: true
				}
			};
		case LIST_POST_TAG_SUCCEED:
			return {
				...state,
				list_post_tag: {
					...state.list_post_tag,
					posts: action.payload.posts,
					posts_count: action.payload.posts_count,
					is_loading: false
				}
			};
		case LIST_POST_TAG_FAILED:
			return {
				...state,
				list_post_tag: {
					...state.list_post_tag,
					errors: action.payload.errors
				}
			};
		//
		case LIST_POST_CATEGORY_REQUESTED:
			return {
				...state,
				list_post_category: {
					...state.list_post_category,
					is_loading: true
				}
			};
		case LIST_POST_CATEGORY_SUCCEED:
			return {
				...state,
				list_post_category: {
					...state.list_post_category,
					posts: action.payload.posts,
					posts_count: action.payload.posts_count,
					is_loading: false
				}
			};
		case LIST_POST_CATEGORY_FAILED:
			return {
				...state,
				list_post_category: {
					...state.list_post_category,
					errors: action.payload.errors
				}
			};
		//
		case SINGLE_POST_REQUESTED:
			return {
				...state,
				single_post: {
					...state.single_post,
					is_loading: true
				}
			};
		case SINGLE_POST_SUCCEED:
			return {
				...state,
				single_post: {
					...state.single_post,
					post: action.payload.post,
					is_loading: false
				}
			};
		case SINGLE_POST_FAILED:
			return {
				...state,
				single_post: {
					...state.single_post,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default postReducer;
