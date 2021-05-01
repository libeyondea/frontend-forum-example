import { call, put, takeLatest } from 'redux-saga/effects';

import commentAPI from '@/lib/api/comment';
import {
	createCommentFailedAction,
	createCommentSucceedAction,
	listCommentFailedAction,
	listCommentSucceedAction
} from '@/redux/actions/commentAction';
import { CREATE_COMMENT_REQUESTED, LIST_COMMENT_REQUESTED } from '@/redux/constants';

function* listComment(action) {
	try {
		const { post_slug, page } = action.payload;
		const res = yield call(commentAPI.list, post_slug, page);
		if (res.success) {
			yield put(listCommentSucceedAction(res.data, res.meta.comments_count));
		}
	} catch (err) {
		yield put(listCommentFailedAction(err.message));
	}
}

function* createComment(action) {
	try {
		const { comment } = action.payload;
		const res = yield call(commentAPI.create, comment);
		if (res.success) {
			yield put(createCommentSucceedAction(res.data));
		}
	} catch (err) {
		yield put(createCommentFailedAction(err.message));
	}
}

export function* listCommentWatcher() {
	yield takeLatest(LIST_COMMENT_REQUESTED, listComment);
}

export function* createCommentWatcher() {
	yield takeLatest(CREATE_COMMENT_REQUESTED, createComment);
}
