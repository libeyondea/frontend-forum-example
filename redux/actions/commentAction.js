import { LIST_COMMENT_FAILED, LIST_COMMENT_REQUESTED, LIST_COMMENT_SUCCEED } from '../constants';

export const listCommentRequestedAction = (post_slug, page) => ({
	type: LIST_COMMENT_REQUESTED,
	payload: {
		post_slug: post_slug,
		page: page
	}
});
export const listCommentSucceedAction = (comments, comments_count) => ({
	type: LIST_COMMENT_SUCCEED,
	payload: {
		comments: comments,
		comments_count: comments_count
	}
});
export const listCommentFailedAction = (errors) => ({
	type: LIST_COMMENT_FAILED,
	payload: {
		errors: errors
	}
});
