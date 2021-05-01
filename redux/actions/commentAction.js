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
//
export const createCommentRequestedAction = (comment) => ({
	type: CREATE_COMMENT_REQUESTED,
	payload: {
		comment: comment
	}
});
export const createCommentSucceedAction = (comment) => ({
	type: CREATE_COMMENT_SUCCEED,
	payload: {
		comment: comment
	}
});
export const createCommentFailedAction = (errors) => ({
	type: CREATE_COMMENT_FAILED,
	payload: {
		errors: errors
	}
});
//
export const deleteCommentRequestedAction = (post_slug, id) => ({
	type: DELETE_COMMENT_REQUESTED,
	payload: {
		post_slug: post_slug,
		id: id
	}
});
export const deleteCommentSucceedAction = (comment) => ({
	type: DELETE_COMMENT_SUCCEED,
	payload: {
		comment: comment
	}
});
export const deleteCommentFailedAction = (errors) => ({
	type: DELETE_COMMENT_FAILED,
	payload: {
		errors: errors
	}
});
