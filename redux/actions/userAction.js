import {
	CURRENT_USER_FAILED,
	CURRENT_USER_REQUESTED,
	CURRENT_USER_SUCCEED,
	EDIT_USER_FAILED,
	EDIT_USER_REQUESTED,
	EDIT_USER_SUCCEED,
	FOLLOW_USER_FAILED,
	FOLLOW_USER_REQUESTED,
	FOLLOW_USER_SUCCEED,
	LOGIN_USER_FAILED,
	LOGIN_USER_REQUESTED,
	LOGIN_USER_SUCCEED,
	LOGOUT_USER_FAILED,
	LOGOUT_USER_REQUESTED,
	LOGOUT_USER_SUCCEED,
	REGISTER_USER_FAILED,
	REGISTER_USER_REQUESTED,
	REGISTER_USER_SUCCEED,
	SINGLE_USER_FAILED,
	SINGLE_USER_REQUESTED,
	SINGLE_USER_SUCCEED,
	UNFOLLOW_USER_FAILED,
	UNFOLLOW_USER_REQUESTED,
	UNFOLLOW_USER_SUCCEED,
	UPDATE_USER_FAILED,
	UPDATE_USER_REQUESTED,
	UPDATE_USER_SUCCEED
} from '@/redux/constants';

export const loginUserRequestedAction = (user, router) => ({
	type: LOGIN_USER_REQUESTED,
	payload: {
		user: user,
		router: router
	}
});
export const loginUserSucceedAction = (user) => ({
	type: LOGIN_USER_SUCCEED,
	payload: {
		user: user
	}
});
export const loginUserFailedAction = (errors) => ({
	type: LOGIN_USER_FAILED,
	payload: {
		errors: errors
	}
});
//
export const currentUserRequestedAction = () => ({
	type: CURRENT_USER_REQUESTED
});
export const currentUserSucceedAction = (user, is_authenticated) => ({
	type: CURRENT_USER_SUCCEED,
	payload: {
		user: user,
		is_authenticated: is_authenticated
	}
});
export const currentUserFailedAction = (errors) => ({
	type: CURRENT_USER_FAILED,
	payload: {
		errors: errors
	}
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
export const updateUserRequestedAction = (user_name, user) => ({
	type: UPDATE_USER_REQUESTED,
	payload: {
		user_name: user_name,
		user: user
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
//
export const followUserRequestedAction = (user_name) => ({
	type: FOLLOW_USER_REQUESTED,
	payload: {
		user_name: user_name
	}
});
export const followUserSucceedAction = (user) => ({
	type: FOLLOW_USER_SUCCEED,
	payload: {
		user: user
	}
});
export const followUserFailedAction = (errors) => ({
	type: FOLLOW_USER_FAILED,
	payload: {
		errors: errors
	}
});
//
export const unFollowUserRequestedAction = (user_name) => ({
	type: UNFOLLOW_USER_REQUESTED,
	payload: {
		user_name: user_name
	}
});
export const unFollowUserSucceedAction = (user) => ({
	type: UNFOLLOW_USER_SUCCEED,
	payload: {
		user: user
	}
});
export const unFollowUserFailedAction = (errors) => ({
	type: UNFOLLOW_USER_FAILED,
	payload: {
		errors: errors
	}
});
//
export const editUserRequestedAction = (user_name) => ({
	type: EDIT_USER_REQUESTED,
	payload: {
		user_name: user_name
	}
});
export const editUserSucceedAction = (user) => ({
	type: EDIT_USER_SUCCEED,
	payload: {
		user: user
	}
});
export const editUserFailedAction = (errors) => ({
	type: EDIT_USER_FAILED,
	payload: {
		errors: errors
	}
});
