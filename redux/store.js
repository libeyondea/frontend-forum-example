import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '@/redux/reducers/rootReducer';
import rootSaga from '@/redux/sagas/rootSaga';

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
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

export const makeStore = (initialState) => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducer, initialState, bindMiddleware([sagaMiddleware]));
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
