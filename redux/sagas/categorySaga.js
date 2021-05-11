import { call, put, takeLatest } from 'redux-saga/effects';

import categoryAPI from '@/lib/api/category';
import {
	listCategoryFailedAction,
	listCategorySucceedAction,
	singleCategoryFailedAction,
	singleCategorySucceedAction
} from '@/redux/actions/categoryAction';
import { LIST_CATEGORY_REQUESTED, SINGLE_CATEGORY_REQUESTED } from '@/redux/constants';

function* listCategory(action) {
	const { page } = action.payload;
	const response = yield call(categoryAPI.list, page);
	if (response.success) {
		yield put(listCategorySucceedAction(response.data));
	} else {
		yield put(listCategoryFailedAction(response.errors));
	}
}

function* singleCategory(action) {
	const { slug } = action.payload;
	const response = yield call(categoryAPI.single, slug);
	if (response.success) {
		yield put(singleCategorySucceedAction(response.data));
	} else {
		yield put(singleCategoryFailedAction(response.errors));
	}
}

export function* listCategoryWatcher() {
	yield takeLatest(LIST_CATEGORY_REQUESTED, listCategory);
}

export function* singleCategoryWatcher() {
	yield takeLatest(SINGLE_CATEGORY_REQUESTED, singleCategory);
}
