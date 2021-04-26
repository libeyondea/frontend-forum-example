import { combineReducers } from 'redux';
import postReducer from './postReducer';
import tagReducer from './tagReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
	users: userReducer,
	posts: postReducer,
	tags: tagReducer,
	categories: categoryReducer,
	comments: commentReducer
});

export default rootReducer;
