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

const initialState = {
	login: {
		user: {},
		is_loading: false,
		errors: null
	},
	current_user: {
		user: {},
		is_authenticated: false,
		is_loading: true,
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
	},
	edit_user: {
		user: {},
		is_loading: true,
		errors: null
	},
	follow_user: {
		user: {},
		is_loading: false,
		errors: null
	},
	unfollow_user: {
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
		//
		case CURRENT_USER_REQUESTED:
			return {
				...state,
				current_user: {
					...state.current_user,
					is_loading: true
				}
			};
		case CURRENT_USER_SUCCEED:
			return {
				...state,
				current_user: {
					...state.current_user,
					user: action.payload.user,
					is_authenticated: action.payload.is_authenticated,
					is_loading: false
				}
			};
		case CURRENT_USER_FAILED:
			return {
				...state,
				current_user: {
					...state.current_user,
					errors: action.payload.errors
				}
			};
		//
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
		//
		case LOGOUT_USER_SUCCEED:
			return {
				...state,
				current_user: {
					...state.current_user,
					user: {},
					is_authenticated: false
				}
			};
		case LOGOUT_USER_FAILED:
			return {
				...state,
				current_user: {
					...state.current_user,
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
		//
		case EDIT_USER_REQUESTED:
			return {
				...state,
				edit_user: {
					...state.edit_user,
					is_loading: true
				}
			};
		case EDIT_USER_SUCCEED:
			return {
				...state,
				edit_user: {
					...state.edit_user,
					user: action.payload.user,
					is_loading: false
				}
			};
		case EDIT_USER_FAILED:
			return {
				...state,
				edit_user: {
					...state.edit_user,
					errors: action.payload.errors
				}
			};
		//
		case FOLLOW_USER_REQUESTED:
			return {
				...state,
				follow_user: {
					...state.follow_user,
					is_loading: true
				}
			};
		case FOLLOW_USER_SUCCEED:
			return {
				...state,
				follow_user: {
					...state.follow_user,
					user: action.payload.user,
					is_loading: false
				},
				single_user: {
					...state.single_user,
					user: {
						...state.single_user.user,
						following: state.single_user.user.user_name === action.payload.user.user_name
					}
				}
			};
		case FOLLOW_USER_FAILED:
			return {
				...state,
				follow_user: {
					...state.follow_user,
					errors: action.payload.errors
				}
			};
		//
		case UNFOLLOW_USER_REQUESTED:
			return {
				...state,
				unfollow_user: {
					...state.unfollow_user,
					is_loading: true
				}
			};
		case UNFOLLOW_USER_SUCCEED:
			return {
				...state,
				unfollow_user: {
					...state.unfollow_user,
					user: action.payload.user,
					is_loading: false
				},
				single_user: {
					...state.single_user,
					user: {
						...state.single_user.user,
						following: !state.single_user.user.user_name === action.payload.user.user_name
					}
				}
			};
		case UNFOLLOW_USER_FAILED:
			return {
				...state,
				unfollow_user: {
					...state.unfollow_user,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default userReducer;
