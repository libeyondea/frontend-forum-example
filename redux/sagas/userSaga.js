import { call, put, takeLatest } from 'redux-saga/effects';

import userAPI from '@/lib/api/user';
import { getCookie, removeCookie, setCookie } from '@/lib/utils/session';
import {
	currentUserFailedAction,
	currentUserSucceedAction,
	editUserFailedAction,
	editUserSucceedAction,
	followUserFailedAction,
	followUserSucceedAction,
	loginUserFailedAction,
	loginUserSucceedAction,
	logoutUserFailedAction,
	logoutUserSucceedAction,
	registerUserFailedAction,
	registerUserSucceedAction,
	singleUserFailedAction,
	singleUserSucceedAction,
	unFollowUserFailedAction,
	unFollowUserSucceedAction,
	updateUserFailedAction,
	updateUserSucceedAction
} from '@/redux/actions/userAction';
import {
	CURRENT_USER_REQUESTED,
	EDIT_USER_REQUESTED,
	FOLLOW_USER_REQUESTED,
	LOGIN_USER_REQUESTED,
	LOGOUT_USER_REQUESTED,
	REGISTER_USER_REQUESTED,
	SINGLE_USER_REQUESTED,
	UNFOLLOW_USER_REQUESTED,
	UPDATE_USER_REQUESTED
} from '@/redux/constants';

function* loginUser(action) {
	const { user, router } = action.payload;
	const response = yield call(userAPI.login, user);
	if (response.success) {
		const user = {
			id: response.data.id,
			user_name: response.data.user_name,
			avatar: response.data.avatar
		};
		setCookie('token', response.data.access_token);
		yield put(loginUserSucceedAction(user));
		router.push('/');
	} else {
		yield put(loginUserFailedAction(response.errors));
	}
}

function* registerUser(action) {
	const { user, router } = action.payload;
	const response = yield call(userAPI.register, user);
	if (response.success) {
		yield put(registerUserSucceedAction(response.data));
		router.push('/login');
	} else {
		yield put(registerUserFailedAction(response.errors));
	}
}

function* currentUser() {
	if (getCookie('token')) {
		const response = yield call(userAPI.current);
		if (response.success) {
			yield put(currentUserSucceedAction(response.data, true));
		} else {
			removeCookie('token');
			yield put(currentUserSucceedAction({}, false));
			yield put(currentUserFailedAction(response.errors));
		}
	} else {
		yield put(currentUserSucceedAction({}, false));
	}
}

function* logoutUser(action) {
	const { router } = action.payload;
	const response = yield call(userAPI.logout);
	if (response.success) {
		removeCookie('token');
		yield put(logoutUserSucceedAction());
		router.push('/login');
	} else {
		yield put(logoutUserFailedAction(response.errors));
	}
}

function* singleUser(action) {
	const { user_name } = action.payload;
	const response = yield call(userAPI.single, user_name);
	if (response.success) {
		yield put(singleUserSucceedAction(response.data));
	} else {
		yield put(singleUserFailedAction(response.errors));
	}
}

function* updateUser(action) {
	const { user_name, user } = action.payload;
	const response = yield call(userAPI.update, user_name, user);
	if (response.success) {
		yield put(updateUserSucceedAction(response.data));
		window.location.replace('/users/' + response.data.user_name);
	} else {
		yield put(updateUserFailedAction(response.errors));
	}
}

function* followUser(action) {
	const { user_name } = action.payload;
	const response = yield call(userAPI.follow, user_name);
	if (response.success) {
		yield put(followUserSucceedAction(response.data));
	} else {
		yield put(followUserFailedAction(response.errors));
	}
}

function* unFollowUser(action) {
	const { user_name } = action.payload;
	const response = yield call(userAPI.unFollow, user_name);
	if (response.success) {
		yield put(unFollowUserSucceedAction(response.data));
	} else {
		yield put(unFollowUserFailedAction(response.errors));
	}
}

function* editUser(action) {
	const { user_name } = action.payload;
	const response = yield call(userAPI.edit, user_name);
	if (response.success) {
		yield put(editUserSucceedAction(response.data));
	} else {
		yield put(editUserFailedAction(response.errors));
	}
}

export function* loginUserWatcher() {
	yield takeLatest(LOGIN_USER_REQUESTED, loginUser);
}

export function* registerUserWatcher() {
	yield takeLatest(REGISTER_USER_REQUESTED, registerUser);
}

export function* currentUserWatcher() {
	yield takeLatest(CURRENT_USER_REQUESTED, currentUser);
}

export function* logoutUserWatcher() {
	yield takeLatest(LOGOUT_USER_REQUESTED, logoutUser);
}

export function* singleUserWatcher() {
	yield takeLatest(SINGLE_USER_REQUESTED, singleUser);
}

export function* updateUserWatcher() {
	yield takeLatest(UPDATE_USER_REQUESTED, updateUser);
}

export function* editUserWatcher() {
	yield takeLatest(EDIT_USER_REQUESTED, editUser);
}

export function* followUserWatcher() {
	yield takeLatest(FOLLOW_USER_REQUESTED, followUser);
}

export function* unFollowUserWatcher() {
	yield takeLatest(UNFOLLOW_USER_REQUESTED, unFollowUser);
}
