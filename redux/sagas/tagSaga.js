import { call, put, takeLatest } from 'redux-saga/effects';

import tagAPI from '@/lib/api/tag';
import {
	followTagFailedAction,
	followTagSucceedAction,
	listTagFailedAction,
	listTagSucceedAction,
	singleTagFailedAction,
	singleTagSucceedAction,
	unFollowTagFailedAction,
	unFollowTagSucceedAction
} from '@/redux/actions/tagAction';
import {
	FOLLOW_TAG_REQUESTED,
	LIST_TAG_REQUESTED,
	SINGLE_TAG_REQUESTED,
	UNFOLLOW_TAG_REQUESTED
} from '@/redux/constants';

function* listTag(action) {
	const { page } = action.payload;
	const response = yield call(tagAPI.list, page);
	if (response.success) {
		yield put(listTagSucceedAction(response.data, response.meta.tags_count));
	} else {
		yield put(listTagFailedAction(response.errors));
	}
}

function* singleTag(action) {
	const { slug } = action.payload;
	const response = yield call(tagAPI.single, slug);
	if (response.success) {
		yield put(singleTagSucceedAction(response.data));
	} else {
		yield put(singleTagFailedAction(response.errors));
	}
}

function* followTag(action) {
	const { slug } = action.payload;
	const response = yield call(tagAPI.follow, slug);
	if (response.success) {
		yield put(followTagSucceedAction(response.data));
	} else {
		yield put(followTagFailedAction(response.errors));
	}
}

function* unFollowTag(action) {
	const { slug } = action.payload;
	const response = yield call(tagAPI.unFollow, slug);
	if (response.success) {
		yield put(unFollowTagSucceedAction(response.data));
	} else {
		yield put(unFollowTagFailedAction(response.errors));
	}
}

export function* listTagWatcher() {
	yield takeLatest(LIST_TAG_REQUESTED, listTag);
}

export function* singleTagWatcher() {
	yield takeLatest(SINGLE_TAG_REQUESTED, singleTag);
}

export function* followTagWatcher() {
	yield takeLatest(FOLLOW_TAG_REQUESTED, followTag);
}

export function* unFollowTagWatcher() {
	yield takeLatest(UNFOLLOW_TAG_REQUESTED, unFollowTag);
}
