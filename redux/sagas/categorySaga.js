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
	try {
		const res = yield call(categoryAPI.list, page);
		if (res.success) {
			yield put(listCategorySucceedAction(res.data));
		}
	} catch (err) {
		yield put(listCategoryFailedAction(err.message));
	}
}

function* singleCategory(action) {
	try {
		const { slug } = action.payload;
		const res = yield call(categoryAPI.single, slug);
		if (res.success) {
			yield put(singleCategorySucceedAction(res.data));
		}
	} catch (err) {
		yield put(singleCategoryFailedAction(err.message));
	}
}

export function* listCategoryWatcher() {
	yield takeLatest(LIST_CATEGORY_REQUESTED, listCategory);
}

export function* singleCategoryWatcher() {
	yield takeLatest(SINGLE_CATEGORY_REQUESTED, singleCategory);
}
