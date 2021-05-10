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

export const listTagRequestedAction = (page) => ({
	type: LIST_TAG_REQUESTED,
	payload: {
		page: page
	}
});
export const listTagSucceedAction = (tags, tags_count) => ({
	type: LIST_TAG_SUCCEED,
	payload: {
		tags: tags,
		tags_count: tags_count
	}
});
export const listTagFailedAction = (errors) => ({
	type: LIST_TAG_FAILED,
	payload: {
		errors: errors
	}
});
//
export const singleTagRequestedAction = (slug) => ({
	type: SINGLE_TAG_REQUESTED,
	payload: {
		slug: slug
	}
});
export const singleTagSucceedAction = (tag) => ({
	type: SINGLE_TAG_SUCCEED,
	payload: {
		tag: tag
	}
});
export const singleTagFailedAction = (errors) => ({
	type: SINGLE_TAG_FAILED,
	payload: {
		errors: errors
	}
});
//
export const followTagRequestedAction = (slug) => ({
	type: FOLLOW_TAG_REQUESTED,
	payload: {
		slug: slug
	}
});
export const followTagSucceedAction = (tag) => ({
	type: FOLLOW_TAG_SUCCEED,
	payload: {
		tag: tag
	}
});
export const followTagFailedAction = (errors) => ({
	type: FOLLOW_TAG_FAILED,
	payload: {
		errors: errors
	}
});
//
export const unFollowTagRequestedAction = (slug) => ({
	type: UNFOLLOW_TAG_REQUESTED,
	payload: {
		slug: slug
	}
});
export const unFollowTagSucceedAction = (tag) => ({
	type: UNFOLLOW_TAG_SUCCEED,
	payload: {
		tag: tag
	}
});
export const unFollowTagFailedAction = (errors) => ({
	type: UNFOLLOW_TAG_FAILED,
	payload: {
		errors: errors
	}
});
