import { call, put, takeLatest } from 'redux-saga/effects';
import { SINGLE_CATEGORY_REQUESTED, LIST_CATEGORY_REQUESTED } from '../constants';
import {
	singleCategorySucceedAction,
	singleCategoryFailedAction,
	listCategorySucceedAction,
	listCategoryFailedAction
} from '../actions/categoryAction';
import categoryAPI from '../../lib/api/category';

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
