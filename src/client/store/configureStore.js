import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers/reducers';
import EnvUtils from '../Utils/envUtils';

export default function configureStore(preloadedState) {
	if (EnvUtils.isServer() || EnvUtils.isProductionEnvironment()) {
		return createStore(
			rootReducer,
			preloadedState,
			applyMiddleware(thunkMiddleware),
		);
	}
	/*
	 Instead of window.devToolsExtension (which was planned to be deprecated in
	 favour of window.__REDUX_DEVTOOLS_EXTENSION__),
	 now we’ll be using window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	 */
	/* eslint-disable no-underscore-dangle */
	const composeEnhancers =
		process.env.NODE_ENV !== 'production' &&
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			: compose;
	return createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(applyMiddleware(thunkMiddleware)),
	);
}
