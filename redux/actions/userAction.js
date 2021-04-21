import {
	LOGIN_USER_REQUESTED,
	LOGIN_USER_SUCCEED,
	LOGIN_USER_FAILED,
	CURRENT_USER_REQUESTED,
	REGISTER_USER_REQUESTED,
	REGISTER_USER_SUCCEED,
	REGISTER_USER_FAILED,
	LOGOUT_USER_REQUESTED,
	LOGOUT_USER_SUCCEED,
	LOGOUT_USER_FAILED,
	SINGLE_USER_REQUESTED,
	SINGLE_USER_SUCCEED,
	SINGLE_USER_FAILED,
	UPDATE_USER_REQUESTED,
	UPDATE_USER_SUCCEED,
	UPDATE_USER_FAILED
} from '../constants';

export const loginUserRequestedAction = (user, router) => ({
	type: LOGIN_USER_REQUESTED,
	payload: {
		user: user,
		router: router
	}
});
export const loginUserSucceedAction = (user, is_authenticated) => ({
	type: LOGIN_USER_SUCCEED,
	payload: {
		user: user,
		is_authenticated: is_authenticated
	}
});
export const loginUserFailedAction = (errors) => ({
	type: LOGIN_USER_FAILED,
	payload: {
		errors: errors
	}
});
export const currentUserRequestedAction = () => ({
	type: CURRENT_USER_REQUESTED
});
//
export const registerUserRequestedAction = (user, router) => ({
	type: REGISTER_USER_REQUESTED,
	payload: {
		user: user,
		router: router
	}
});
export const registerUserSucceedAction = (user) => ({
	type: REGISTER_USER_SUCCEED,
	payload: {
		user: user
	}
});
export const registerUserFailedAction = (errors) => ({
	type: REGISTER_USER_FAILED,
	payload: {
		errors: errors
	}
});
//
export const logoutUserRequestedAction = (router) => ({
	type: LOGOUT_USER_REQUESTED,
	payload: {
		router: router
	}
});
export const logoutUserSucceedAction = () => ({
	type: LOGOUT_USER_SUCCEED
});
export const logoutUserFailedAction = (errors) => ({
	type: LOGOUT_USER_FAILED,
	payload: {
		errors: errors
	}
});
//
export const singleUserRequestedAction = (user_name) => ({
	type: SINGLE_USER_REQUESTED,
	payload: {
		user_name: user_name
	}
});
export const singleUserSucceedAction = (user) => ({
	type: SINGLE_USER_SUCCEED,
	payload: {
		user: user
	}
});
export const singleUserFailedAction = (errors) => ({
	type: SINGLE_USER_FAILED,
	payload: {
		errors: errors
	}
});
//
export const updateUserRequestedAction = (user_name, user, router) => ({
	type: UPDATE_USER_REQUESTED,
	payload: {
		user_name: user_name,
		user: user,
		router: router
	}
});
export const updateUserSucceedAction = (user) => ({
	type: UPDATE_USER_SUCCEED,
	payload: {
		user: user
	}
});
export const updateUserFailedAction = (errors) => ({
	type: UPDATE_USER_FAILED,
	payload: {
		errors: errors
	}
});
