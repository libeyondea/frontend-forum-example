import { all } from 'redux-saga/effects';
import { listPostWatcher, listPostTagWatcher, singlePostWatcher } from './postSaga';
import { singleTagWatcher, listTagWatcher } from './tagSaga';
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
		singlePostWatcher(),
		listTagWatcher(),
		singleTagWatcher(),
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
