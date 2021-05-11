import { call, put, takeLatest } from 'redux-saga/effects';

import commentAPI from '@/lib/api/comment';
import {
	createCommentFailedAction,
	createCommentSucceedAction,
	deleteCommentFailedAction,
	deleteCommentSucceedAction,
	listCommentFailedAction,
	listCommentSucceedAction
} from '@/redux/actions/commentAction';
import { CREATE_COMMENT_REQUESTED, DELETE_COMMENT_REQUESTED, LIST_COMMENT_REQUESTED } from '@/redux/constants';

function* listComment(action) {
	const { post_slug, page } = action.payload;
	const response = yield call(commentAPI.list, post_slug, page);
	if (response.success) {
		yield put(listCommentSucceedAction(response.data, response.meta.comments_count));
	} else {
		yield put(listCommentFailedAction(response.errors));
	}
}

function* createComment(action) {
	const { comment } = action.payload;
	const response = yield call(commentAPI.create, comment);
	if (response.success) {
		yield put(createCommentSucceedAction(response.data));
	} else {
		yield put(createCommentFailedAction(response.errors));
	}
}

function* deleteComment(action) {
	const { post_slug, id } = action.payload;
	const response = yield call(commentAPI.delete, post_slug, id);
	if (response.success) {
		yield put(deleteCommentSucceedAction(response.data));
	} else {
		yield put(deleteCommentFailedAction(response.errors));
	}
}

export function* listCommentWatcher() {
	yield takeLatest(LIST_COMMENT_REQUESTED, listComment);
}

export function* createCommentWatcher() {
	yield takeLatest(CREATE_COMMENT_REQUESTED, createComment);
}

export function* deleteCommentWatcher() {
	yield takeLatest(DELETE_COMMENT_REQUESTED, deleteComment);
}
