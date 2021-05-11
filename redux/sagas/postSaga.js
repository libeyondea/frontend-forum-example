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
	const { page, tab } = action.payload;
	const response = yield call(postAPI.list, tab, page);
	if (response.success) {
		yield put(listPostSucceedAction(response.data, response.meta.posts_count));
	} else {
		yield put(listPostFailedAction(response.eerrors));
	}
}

function* listPostTag(action) {
	const { tag_slug, tab, page } = action.payload;
	const response = yield call(postAPI.listByTag, tag_slug, tab, page);
	if (response.success) {
		yield put(listPostTagSucceedAction(response.data, response.meta.posts_count));
	} else {
		yield put(listPostTagFailedAction(response.errors));
	}
}

function* listPostCategory(action) {
	const { category_slug, tab, page } = action.payload;
	const response = yield call(postAPI.listByCategory, category_slug, tab, page);
	if (response.success) {
		yield put(listPostCategorySucceedAction(response.data, response.meta.posts_count));
	} else {
		yield put(listPostCategoryFailedAction(response.errors));
	}
}

function* listPostUser(action) {
	const { user_name, page } = action.payload;
	const response = yield call(postAPI.listByUser, user_name, page);
	if (response.success) {
		yield put(listPostUserSucceedAction(response.data, response.meta.posts_count));
	} else {
		yield put(listPostUserFailedAction(response.errors));
	}
}

function* singlePost(action) {
	const { slug } = action.payload;
	const response = yield call(postAPI.single, slug);
	if (response.success) {
		yield put(singlePostSucceedAction(response.data));
	} else {
		yield put(singlePostFailedAction(response.errors));
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
