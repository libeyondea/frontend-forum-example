import {
	LOGIN_USER_REQUESTED,
	LOGIN_USER_SUCCEED,
	LOGIN_USER_FAILED,
	REGISTER_USER_REQUESTED,
	REGISTER_USER_SUCCEED,
	REGISTER_USER_FAILED,
	LOGOUT_USER_SUCCEED,
	LOGOUT_USER_FAILED,
	SINGLE_USER_REQUESTED,
	SINGLE_USER_SUCCEED,
	SINGLE_USER_FAILED,
	UPDATE_USER_REQUESTED,
	UPDATE_USER_SUCCEED,
	UPDATE_USER_FAILED
} from '../constants';

const initialState = {
	login: {
		user: {},
		is_authenticated: false,
		is_loading: false,
		errors: null
	},
	register: {
		user: {},
		is_loading: false,
		errors: null
	},
	single_user: {
		user: {},
		is_loading: true,
		errors: null
	},
	update_user: {
		user: {},
		is_loading: false,
		errors: null
	}
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER_REQUESTED:
			return {
				...state,
				login: {
					...state.login,
					is_loading: true
				}
			};
		case LOGIN_USER_SUCCEED:
			return {
				...state,
				login: {
					...state.login,
					user: action.payload.user,
					is_authenticated: true,
					is_loading: false
				}
			};
		case LOGIN_USER_FAILED:
			return {
				...state,
				login: {
					...state.login,
					errors: action.payload.errors,
					is_loading: false
				}
			};

		case REGISTER_USER_REQUESTED:
			return {
				...state,
				register: {
					...state.register,
					is_loading: true
				}
			};
		case REGISTER_USER_SUCCEED:
			return {
				...state,
				register: {
					...state.register,
					user: action.payload.user,
					is_loading: false
				}
			};
		case REGISTER_USER_FAILED:
			return {
				...state,
				register: {
					...state.register,
					errors: action.payload.errors,
					is_loading: false
				}
			};

		case LOGOUT_USER_SUCCEED:
			return {
				...state,
				login: {
					...state.login,
					user: {},
					is_authenticated: false
				}
			};
		case LOGOUT_USER_FAILED:
			return {
				...state,
				login: {
					...state.login,
					errors: action.payload.errors
				}
			};
		//
		case SINGLE_USER_REQUESTED:
			return {
				...state,
				single_user: {
					...state.single_user,
					is_loading: true
				}
			};
		case SINGLE_USER_SUCCEED:
			return {
				...state,
				single_user: {
					...state.single_user,
					user: action.payload.user,
					is_loading: false
				}
			};
		case SINGLE_USER_FAILED:
			return {
				...state,
				single_user: {
					...state.single_user,
					errors: action.payload.errors
				}
			};
		//
		case UPDATE_USER_REQUESTED:
			return {
				...state,
				update_user: {
					...state.update_user,
					is_loading: true
				}
			};
		case UPDATE_USER_SUCCEED:
			return {
				...state,
				update_user: {
					...state.update_user,
					user: action.payload.user,
					is_loading: false
				}
			};
		case UPDATE_USER_FAILED:
			return {
				...state,
				update_user: {
					...state.update_user,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default userReducer;
