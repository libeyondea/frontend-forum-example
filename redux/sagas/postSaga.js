import { call, put, takeLatest } from 'redux-saga/effects';

import postAPI from '@/lib/api/post';
import {
	listPostCategoryFailedAction,
	listPostCategorySucceedAction,
	listPostFailedAction,
	listPostSucceedAction,
	listPostTagFailedAction,
	listPostTagSucceedAction,
	listPostUserFailedAction,
	listPostUserSucceedAction,
	singlePostFailedAction,
	singlePostSucceedAction
} from '@/redux/actions/postAction';
import {
	LIST_POST_CATEGORY_REQUESTED,
	LIST_POST_REQUESTED,
	LIST_POST_TAG_REQUESTED,
	LIST_POST_USER_REQUESTED,
	SINGLE_POST_REQUESTED
} from '@/redux/constants';

function* listPost(action) {
	try {
		const { page, tab } = action.payload;
		const res = yield call(postAPI.list, tab, page);
		if (res.success) {
			yield put(listPostSucceedAction(res.data, res.meta.posts_count));
		}
	} catch (err) {
		yield put(listPostFailedAction(err.message));
	}
}

function* listPostTag(action) {
	try {
		const { tag_slug, tab, page } = action.payload;
		const res = yield call(postAPI.listByTag, tag_slug, tab, page);
		if (res.success) {
			yield put(listPostTagSucceedAction(res.data, res.meta.posts_count));
		}
	} catch (err) {
		yield put(listPostTagFailedAction(err.message));
	}
}

function* listPostCategory(action) {
	try {
		const { category_slug, tab, page } = action.payload;
		const res = yield call(postAPI.listByCategory, category_slug, tab, page);
		if (res.success) {
			yield put(listPostCategorySucceedAction(res.data, res.meta.posts_count));
		}
	} catch (err) {
		yield put(listPostCategoryFailedAction(err.message));
	}
}

function* listPostUser(action) {
	try {
		const { user_name, page } = action.payload;
		const res = yield call(postAPI.listByUser, user_name, page);
		if (res.success) {
			yield put(listPostUserSucceedAction(res.data, res.meta.posts_count));
		}
	} catch (err) {
		yield put(listPostUserFailedAction(err.message));
	}
}

function* singlePost(action) {
	try {
		const { slug } = action.payload;
		const res = yield call(postAPI.single, slug);
		if (res.success) {
			yield put(singlePostSucceedAction(res.data));
		}
	} catch (err) {
		yield put(singlePostFailedAction(err.message));
	}
}

export function* listPostWatcher() {
	yield takeLatest(LIST_POST_REQUESTED, listPost);
}

export function* listPostTagWatcher() {
	yield takeLatest(LIST_POST_TAG_REQUESTED, listPostTag);
}

export function* listPostCategoryWatcher() {
	yield takeLatest(LIST_POST_CATEGORY_REQUESTED, listPostCategory);
}

export function* listPostUserWatcher() {
	yield takeLatest(LIST_POST_USER_REQUESTED, listPostUser);
}

export function* singlePostWatcher() {
	yield takeLatest(SINGLE_POST_REQUESTED, singlePost);
}
