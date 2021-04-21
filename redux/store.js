import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		const { composeWithDevTools } = require('redux-devtools-extension');
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const { posts } = action.payload;
		const { single_post } = posts;
		const nextState = {
			...state,
			posts: {
				...state.posts,
				single_post
			}
		};
		return nextState;
	} else {
		return rootReducer(state, action);
	}
};

export const makeStore = (context) => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducer, bindMiddleware([sagaMiddleware]));
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
