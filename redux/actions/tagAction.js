import {
	LIST_TAG_FAILED,
	LIST_TAG_REQUESTED,
	LIST_TAG_SUCCEED,
	SINGLE_TAG_FAILED,
	SINGLE_TAG_REQUESTED,
	SINGLE_TAG_SUCCEED
} from '@/redux/constants';

export const listTagRequestedAction = (page) => ({
	type: LIST_TAG_REQUESTED,
	payload: {
		page: page
	}
});
export const listTagSucceedAction = (tags) => ({
	type: LIST_TAG_SUCCEED,
	payload: {
		tags: tags
	}
});
export const listTagFailedAction = (errors) => ({
	type: LIST_TAG_FAILED,
	payload: {
		errors: errors
	}
});

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
