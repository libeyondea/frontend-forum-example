import { combineReducers } from 'redux';

import categoryReducer from '@/redux/reducers/categoryReducer';
import commentReducer from '@/redux/reducers/commentReducer';
import postReducer from '@/redux/reducers/postReducer';
import tagReducer from '@/redux/reducers/tagReducer';
import userReducer from '@/redux/reducers/userReducer';

const rootReducer = combineReducers({
	users: userReducer,
	posts: postReducer,
	tags: tagReducer,
	categories: categoryReducer,
	comments: commentReducer
});

export default rootReducer;
