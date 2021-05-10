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
	LIST_POST_USER_FAILED,
	LIST_POST_USER_REQUESTED,
	LIST_POST_USER_SUCCEED,
	SINGLE_POST_FAILED,
	SINGLE_POST_REQUESTED,
	SINGLE_POST_SUCCEED
} from '@/redux/constants';

export const listPostRequestedAction = (tab, page) => ({
	type: LIST_POST_REQUESTED,
	payload: {
		tab: tab,
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
export const listPostTagRequestedAction = (tag_slug, tab, page) => ({
	type: LIST_POST_TAG_REQUESTED,
	payload: {
		tag_slug: tag_slug,
		tab: tab,
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
export const listPostCategoryRequestedAction = (category_slug, tab, page) => ({
	type: LIST_POST_CATEGORY_REQUESTED,
	payload: {
		category_slug: category_slug,
		tab: tab,
		page: page
	}
});
export const listPostCategorySucceedAction = (posts, posts_count) => ({
	type: LIST_POST_CATEGORY_SUCCEED,
	payload: {
		posts: posts,
		posts_count: posts_count
	}
});
export const listPostCategoryFailedAction = (errors) => ({
	type: LIST_POST_CATEGORY_FAILED,
	payload: {
		errors: errors
	}
});
//
export const listPostUserRequestedAction = (user_name, page) => ({
	type: LIST_POST_USER_REQUESTED,
	payload: {
		user_name: user_name,
		page: page
	}
});
export const listPostUserSucceedAction = (posts, posts_count) => ({
	type: LIST_POST_USER_SUCCEED,
	payload: {
		posts: posts,
		posts_count: posts_count
	}
});
export const listPostUserFailedAction = (errors) => ({
	type: LIST_POST_USER_FAILED,
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
