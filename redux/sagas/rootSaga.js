import { all } from 'redux-saga/effects';
import { listPostWatcher, listPostTagWatcher, listPostCategoryWatcher, singlePostWatcher } from './postSaga';
import { singleTagWatcher, listTagWatcher } from './tagSaga';
import { singleCategoryWatcher, listCategoryWatcher } from './categorySaga';
import { listCommentWatcher } from './commentSaga';
import {
	loginUserWatcher,
	registerUserWatcher,
	currentUserWatcher,
	logoutUserWatcher,
	singleUserWatcher,
	updateUserWatcher
} from './userSaga';

function* rootSaga() {
	yield all([
		listPostWatcher(),
		listPostTagWatcher(),
		listPostCategoryWatcher(),
		singlePostWatcher(),
		listTagWatcher(),
		singleTagWatcher(),
		listCategoryWatcher(),
		singleCategoryWatcher(),
		loginUserWatcher(),
		registerUserWatcher(),
		currentUserWatcher(),
		logoutUserWatcher(),
		singleUserWatcher(),
		updateUserWatcher(),
		listCommentWatcher()
	]);
}

export default rootSaga;
