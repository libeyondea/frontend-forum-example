import { call, put, takeLatest } from 'redux-saga/effects';

import tagAPI from '@/lib/api/tag';
import {
	listTagFailedAction,
	listTagSucceedAction,
	singleTagFailedAction,
	singleTagSucceedAction
} from '@/redux/actions/tagAction';
import { LIST_TAG_REQUESTED, SINGLE_TAG_REQUESTED } from '@/redux/constants';

function* listTag(action) {
	const { page } = action.payload;
	try {
		const res = yield call(tagAPI.list, page);
		if (res.success) {
			yield put(listTagSucceedAction(res.data, res.meta.tags_count));
		}
	} catch (err) {
		yield put(listTagFailedAction(err.message));
	}
}

function* singleTag(action) {
	try {
		const { slug } = action.payload;
		const res = yield call(tagAPI.single, slug);
		if (res.success) {
			yield put(singleTagSucceedAction(res.data));
		}
	} catch (err) {
		yield put(singleTagFailedAction(err.message));
	}
}

export function* listTagWatcher() {
	yield takeLatest(LIST_TAG_REQUESTED, listTag);
}

export function* singleTagWatcher() {
	yield takeLatest(SINGLE_TAG_REQUESTED, singleTag);
}
