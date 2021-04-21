import {
	LIST_POST_REQUESTED,
	LIST_POST_SUCCEED,
	LIST_POST_FAILED,
	LIST_POST_TAG_REQUESTED,
	LIST_POST_TAG_SUCCEED,
	LIST_POST_TAG_FAILED,
	SINGLE_POST_REQUESTED,
	SINGLE_POST_SUCCEED,
	SINGLE_POST_FAILED
} from '../constants';

export const listPostRequestedAction = (page) => ({
	type: LIST_POST_REQUESTED,
	payload: {
		page: page
	}
});
export const listPostSucceedAction = (posts, posts_count) => ({
	type: LIST_POST_SUCCEED,
	payload: {
		posts: posts,
		posts_count: posts_count
	}
});
export const listPostFailedAction = (errors) => ({
	type: LIST_POST_FAILED,
	payload: {
		errors: errors
	}
});
//
export const listPostTagRequestedAction = (tag_slug, page) => ({
	type: LIST_POST_TAG_REQUESTED,
	payload: {
		tag_slug: tag_slug,
		page: page
	}
});
export const listPostTagSucceedAction = (posts, posts_count) => ({
	type: LIST_POST_TAG_SUCCEED,
	payload: {
		posts: posts,
		posts_count: posts_count
	}
});
export const listPostTagFailedAction = (errors) => ({
	type: LIST_POST_TAG_FAILED,
	payload: {
		errors: errors
	}
});
//
export const singlePostRequestedAction = (slug) => ({
	type: SINGLE_POST_REQUESTED,
	payload: {
		slug: slug
	}
});
export const singlePostSucceedAction = (post) => ({
	type: SINGLE_POST_SUCCEED,
	payload: {
		post: post
	}
});
export const singlePostFailedAction = (errors) => ({
	type: SINGLE_POST_FAILED,
	payload: {
		errors: errors
	}
});
