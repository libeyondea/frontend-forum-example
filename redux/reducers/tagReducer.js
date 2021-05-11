import {
	FOLLOW_TAG_FAILED,
	FOLLOW_TAG_REQUESTED,
	FOLLOW_TAG_SUCCEED,
	LIST_TAG_FAILED,
	LIST_TAG_REQUESTED,
	LIST_TAG_SUCCEED,
	SINGLE_TAG_FAILED,
	SINGLE_TAG_REQUESTED,
	SINGLE_TAG_SUCCEED,
	UNFOLLOW_TAG_FAILED,
	UNFOLLOW_TAG_REQUESTED,
	UNFOLLOW_TAG_SUCCEED
} from '@/redux/constants';

const initialState = {
	list_tag: {
		tags: [],
		tags_count: 0,
		is_loading: true,
		errors: {}
	},
	single_tag: {
		tag: {},
		is_loading: true,
		errors: {}
	},
	follow_tag: {
		tag: {},
		is_loading: false,
		errors: {}
	},
	unfollow_tag: {
		tag: {},
		is_loading: false,
		errors: {}
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
					tags_count: action.payload.tags_count,
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
		//
		case FOLLOW_TAG_REQUESTED:
			return {
				...state,
				follow_tag: {
					...state.follow_tag,
					is_loading: true
				}
			};
		case FOLLOW_TAG_SUCCEED:
			return {
				...state,
				follow_tag: {
					...state.follow_tag,
					tag: action.payload.tag,
					is_loading: false
				},
				list_tag: {
					...state.list_tag,
					tags: state.list_tag.tags.map((t) => (t.slug === action.payload.tag.slug ? { ...t, following: true } : t))
				},
				single_tag: {
					...state.single_tag,
					tag:
						state.single_tag.tag.slug === action.payload.tag.slug
							? { ...state.single_tag.tag, following: true }
							: state.single_tag.tag
				}
			};
		case FOLLOW_TAG_FAILED:
			return {
				...state,
				follow_tag: {
					...state.follow_tag,
					errors: action.payload.errors
				}
			};
		//
		case UNFOLLOW_TAG_REQUESTED:
			return {
				...state,
				unfollow_tag: {
					...state.unfollow_tag,
					is_loading: true
				}
			};
		case UNFOLLOW_TAG_SUCCEED:
			return {
				...state,
				unfollow_tag: {
					...state.unfollow_tag,
					tag: action.payload.tag,
					is_loading: false
				},
				list_tag: {
					...state.list_tag,
					tags: state.list_tag.tags.map((t) => (t.slug === action.payload.tag.slug ? { ...t, following: false } : t))
				},
				single_tag: {
					...state.single_tag,
					tag:
						state.single_tag.tag.slug === action.payload.tag.slug
							? { ...state.single_tag.tag, following: false }
							: state.single_tag.tag
				}
			};
		case UNFOLLOW_TAG_FAILED:
			return {
				...state,
				unfollow_tag: {
					...state.unfollow_tag,
					errors: action.payload.errors
				}
			};

		default:
			return state;
	}
};

export default tagReducer;
