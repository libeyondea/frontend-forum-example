import { call, put, takeLatest } from 'redux-saga/effects';
import {
	loginUserSucceedAction,
	loginUserFailedAction,
	logoutUserSucceedAction,
	logoutUserFailedAction,
	registerUserSucceedAction,
	registerUserFailedAction,
	singleUserSucceedAction,
	singleUserFailedAction,
	updateUserSucceedAction,
	updateUserFailedAction
} from '../actions/userAction';
import {
	LOGIN_USER_REQUESTED,
	CURRENT_USER_REQUESTED,
	REGISTER_USER_REQUESTED,
	SINGLE_USER_REQUESTED,
	LOGOUT_USER_REQUESTED,
	UPDATE_USER_REQUESTED
} from '../constants';
import userAPI from 'lib/api/user';
import { setCookie, getCookie, removeCookie } from 'lib/utils/session';

function* loginUser(action) {
	try {
		const { user, router } = action.payload;
		const res = yield call(userAPI.login, user);
		if (res.success) {
			const user = {
				id: res.data.id,
				user_name: res.data.user_name,
				avatar: res.data.avatar
			};
			setCookie('token', res.data.access_token);
			//window.localStorage.setItem('token', res.data.access_token);
			yield put(loginUserSucceedAction(user));
			router.push('/');
		} else {
			yield put(loginUserFailedAction(res.errors));
		}
	} catch (err) {
		yield put(loginUserFailedAction(err.message));
	}
}

function* registerUser(action) {
	try {
		const { user, router } = action.payload;
		const res = yield call(userAPI.register, user);
		if (res.success) {
			yield put(registerUserSucceedAction(res.data));
			router.push('/user/login');
		} else {
			yield put(registerUserFailedAction(res.errors));
		}
	} catch (err) {
		yield put(registerUserFailedAction(err.message));
	}
}

function* currentUser() {
	try {
		if (getCookie('token')) {
			const res = yield call(userAPI.current);
			if (res.success) {
				yield put(loginUserSucceedAction(res.data));
			} else {
				removeCookie('token');
				//window.localStorage.removeItem('token');
				yield put(logoutUserSucceedAction());
			}
		}
	} catch (err) {
		removeCookie('token');
		//window.localStorage.removeItem('token');
		yield put(logoutUserSucceedAction());
		yield put(loginUserFailedAction(err.message));
	}
}

function* logoutUser(action) {
	try {
		const { router } = action.payload;
		const res = yield call(userAPI.logout);
		if (res.success) {
			removeCookie('token');
			//window.localStorage.removeItem('token');
			yield put(logoutUserSucceedAction());
			router.push('/user/login');
		}
	} catch (err) {
		yield put(logoutUserFailedAction(err.message));
	}
}

function* singleUser(action) {
	try {
		const { user_name } = action.payload;
		const res = yield call(userAPI.single, user_name);
		if (res.success) {
			yield put(singleUserSucceedAction(res.data));
		}
	} catch (err) {
		yield put(singleUserFailedAction(err.message));
	}
}

function* updateUser(action) {
	try {
		const { user_name, user, router } = action.payload;
		const res = yield call(userAPI.update, user_name, user);
		if (res.success) {
			yield put(updateUserSucceedAction(res.result));
			removeCookie('token');
			//window.localStorage.removeItem('token');
			window.location.reload();
		}
	} catch (err) {
		yield put(updateUserFailedAction(err.message));
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
