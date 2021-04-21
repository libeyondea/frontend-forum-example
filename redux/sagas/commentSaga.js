import { call, put, takeLatest } from 'redux-saga/effects';
import { LIST_COMMENT_REQUESTED } from '../constants';
import { listCommentSucceedAction, listCommentFailedAction } from '../actions/commentAction';
import commentAPI from '../../lib/api/comment';

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

export function* listCommentWatcher() {
	yield takeLatest(LIST_COMMENT_REQUESTED, listComment);
}
